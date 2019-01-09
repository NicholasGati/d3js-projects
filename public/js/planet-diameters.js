'use strict'

const main = data => {
	const div = d3.select('#app')
	const margin = { top: 100, right: 50, bottom: 80, left: 100 }
	const width = window.innerWidth - margin.right - margin.left
	const height = window.innerHeight - margin.top - margin.bottom

	// Format our numbers with a comma
	const format = d3.format(',')

	// The maximum number in our data
	const maxY = d3.max(data.map(d => d.diameter))

	const xScale = d3.scaleBand()
		.domain(data.map(d => d.planet))
	  .rangeRound([0, width])
	  .padding(0.1)

	const yScale = d3.scaleLinear()
		.domain([0, maxY])
	  .rangeRound([height, 0])
	  .nice()

	const svg = div.append('svg')
		.attr('width', width + margin.left + margin.right)
	  .attr('height', height + margin.top + margin.bottom)
	  .style('background-color', '#11141C')
	  .append('g')
	  	.attr('transform', `translate(${margin.left}, ${margin.top})`)

	/*
	 * Add the X and Y axis
	 * and X/Y axis text
	 */
	const xAxis = svg.append('g')
		.attr('class', 'x axis')
	  .attr('transform', `translate(0, ${height})`)
	  .call(d3.axisBottom(xScale))
	  	.append('text')
	    .attr('fill', '#00A0B0')
	    .attr('y', 30)
			.attr('dy','0.71em')
	    .attr('x', width / 2)
			.attr('text-anchor', 'middle')
	    .text('Planets')

	const yAxis = svg.append('g')
		.attr('class', 'y axis')
	  .call(d3.axisLeft(yScale))
	  	.append('text')
	    .attr('fill', '#00A0B0')
	    .attr('transform', 'rotate(-90)')
	    .attr('y', 6)
			.attr('dy', '0.71em')
			.attr('text-anchor', 'end')
	    .text('Diameter (km)')

	/*
	 * Add the bars
	 */
	 const bars = svg.selectAll('.bar')
	 	.data(data)
	  .enter().append('rect')
	  .attr('class', 'bar')
	  .attr('x', d => xScale(d.planet))
	  .attr('y', d => height)
	  .attr('width', xScale.bandwidth())
	  .on('mouseover', function() {
	  	d3.select(this)
	    	.transition().duration(400)
	    	.style('fill-opacity', 1)
	  })
	  .on('mouseout', function() {
	  	d3.select(this)
	    	.transition().duration(400)
	    	.style('fill-opacity', 0.2)
	  })
	  .style('stroke', '#00A0B0')
	  .style('stroke-width', 1)
	  .style('fill', '#00A0B0')
	  .style('fill-opacity', 0.2)
	  .transition().duration(250)
	  .delay((d, i) => i * 200)
	  .attr('y', d => yScale(d.diameter))
	  .attr('height', d => height - yScale(d.diameter))

	 /*
	  * Add bar value text on top of bars
	  */
	 svg.selectAll('.text')
	 	.data(data)
	  .enter().append('text')
	  .attr('class', 'text')
	  .attr('x', d => xScale(d.planet))
	  .attr('y', d => yScale(d.diameter))
	  .attr('dx', xScale.bandwidth() / 2)
	  .attr('dy', '-0.6em')
	  .style('text-anchor', 'middle')
	 	.style('fill', '#00A0B0')
	  .style('opacity', 0)
	  .text(d => format(d.diameter))
	  .transition().duration(250)
	  .delay((d, i) => i * 200)
	  .style('opacity', 1)
}

d3.csv('/data/planet-diameters.csv').then(data => {
	const formattedData = data.map(d => {
		return { planet: d.planet, diameter: +d.diameter }
	})
	main(formattedData)
}).catch(err => console.error(err))
