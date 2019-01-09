'use strict'

const main = dataset => {
	const div = d3.select('#app')
	const margin = { top: 100, right: 50, bottom: 80, left: 50 }
	const height = window.innerHeight - margin.top - margin.bottom
	const width = window.innerWidth - margin.left - margin.right
	const svg = div.append('svg')
		.attr('height', height + margin.top + margin.bottom)
	  .attr('width', width + margin.left + margin.right)
	  .style('background-color', '#11141C')
	  .append('g')
	  	.attr('transform', `translate(${margin.left}, ${margin.top})`)

	const keys = Object.keys(dataset[0])

	const data = dataset.map(d => {
		d.total = d.dog + d.cat
	  return d
	})

	// Sort the data
	const sorted = data.sort((a, b) => b.total - a.total)

	/*
	* X, Y, and Z scales
	* scaleBand helps to determine the geometry of the bars,
	* taking into account padding between each bar.
	* The width of each band can be accessed using .bandwidth()
	*
	* paddingInner: specifies (as a percentage of the band width)
	* the amount of padding between each band.
	*
	* paddingOuter which specifies (as a percentage of the band width)
	* the amount of padding before the first band and after the last band.
	*/
	const xScale = d3.scaleBand()
		.rangeRound([0, width])
	  .domain(data.map(d => d.state))
	  .paddingInner(0.1)
	  .align(0.8)

	const yScale = d3.scaleLinear()
		.range([height, 0])
	  .domain([0, d3.max(data, d => d.total)])
	  .nice() // adds some room on the top

	// Out stacked colors
	const zScale = d3.scaleOrdinal()
		.range(['#A56BCF', '#DE6BB6'])
	  .domain(keys)

	// X and Y Axis
	const xAxis = svg.append('g')
		.attr('class', 'x axis')
	  .attr('transform', `translate(0, ${height})`)
	  .call(d3.axisBottom(xScale))
	  .append('text')
	  .attr('x', width / 2)
	  .attr('y', 35)
	  .attr('dy', '0.32em')
	  .style('text-anchor', 'middle')
	  .text('States')

	const yAxis = svg.append('g')
		.attr('class', 'y axis')
	  .call(d3.axisLeft(yScale).ticks(null, 's'))
	  .append("text")
	  .attr("x", 3)
	  .attr("y", yScale(yScale.ticks().pop()) + 0.5)
	  .attr("dy", "-0.5em")
	  .attr("text-anchor", "start")
	  .text("Pet Population (Dogs/Cats)");

	// The stacked bars
	const bars = svg.append('g')
		.selectAll('g')
	  .data(d3.stack().keys(keys)(dataset))
	  .enter().append('g')
	  	.style('fill', d => zScale(d.key))
		.selectAll('rect')
	  .data(d => d)
	  .enter().append('rect')
	  	.attr('x', d => xScale(d.data.state))
	    .attr('y', d => yScale(d[1]))
	    .attr('height', d => yScale(d[0]) - yScale(d[1]))
	    .attr('width', xScale.bandwidth())
}

d3.csv('/data/stacked-bars.csv')
	.then(data => {
		const dataset = data.map(d => {
			return { state: d.state, dog: +d.dog, cat: +d.cat }
		})

		main(dataset)
	})
	.catch(err => console.error(err))
