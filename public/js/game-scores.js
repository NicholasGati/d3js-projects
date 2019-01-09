'use strict'

const main = data => {
	const margin = { top: 100, right: 50, bottom: 80, left: 75 }
	const height = window.innerHeight - margin.top - margin.bottom
	const width  = window.innerWidth - margin.left - margin.right

	const svg = d3.select('#app')
		.append('svg')
	    .attr('width', width + margin.right + margin.left)
	    .attr('height', height + margin.top + margin.bottom)
	    .append('g')
	    	.attr('transform', `translate(${margin.left}, ${margin.top})`)

	// Create X and Y scales. ScaleBand for bars.
	const x = d3.scaleLinear()
							.domain([0, d3.max(data.map(d => d.points))])
	            .rangeRound([0, width])
	            .nice()

	const y = d3.scaleBand()
							.domain(data.map(d => d.player))
	            .range([height, 0])
	            .padding(0.1)

	// Add our X and Y axis onto the SVG
	const xAxis = svg.append('g')
									 .attr('class', 'x axis')
	                 .attr('transform', `translate(0, ${height})`)
	                 .call(d3.axisBottom(x))

	const yAxis = svg.append('g')
									.attr('class', 'y axis')
	                .call(d3.axisLeft(y))

	// Create our bars
	const bars = svg.selectAll('.bar')
									.data(data)
	                .enter().append('rect')
	                .attr('class', 'bar')
	                .attr('x', 0)
	                .attr('y', d => y(d.player))
	                .attr('height', y.bandwidth())
	                .attr('width', x(0))
	                .style('fill', '#A39EF2')

	// Attach even listeners
	bars.on('mouseover', function () {
		d3.select(this).style('fill', '#7D77E7')
	})

	bars.on('mouseout', function () {
		d3.select(this).style('fill', '#A39EF2')
	})

	// Animate bars
	bars.transition().duration(2000)
			.attr('width', d => x(d.points))
	    .ease(d3.easeCubic)

	// Append Text to bars displayiing the points
	const text = svg.selectAll('.points')
									.data(data)
	                .enter().append('text')
	                .attr('x', d => x(d.points))
	                .attr('y', d => y(d.player))
	                .attr('dx', -20)
	                .attr('dy', (y.bandwidth() / 2) + 5)
	                .text(d => d.points)
	                .style('text-anchor', 'middle')
	                .style('fill', '#CAE3FA')
	                .style('font-family', 'Courier')

	// Add title to the chart
	const title = svg.append('text')
									 .attr('x', width / 2)
	                 .attr('y', -15)
	                 .style('text-anchor', 'middle')
									 .text('Game 1 Final Scores')
	                 .style('font-family', 'Courier')
	                 .style('fill', '#3F37C5')

}

d3.csv('/data/game-scores.csv').then(data => {
	const formattedData = data.map(d => {
		return { player: d.player, points: +d.points }
	})
	main(formattedData)
}).catch(err => console.error(err))
