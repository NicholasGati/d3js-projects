'use strict'

const main = data => {
	const div = d3.select('#app')
	const margin = { top: 100, right: 75, bottom: 100, left: 75 }
	const width = window.innerWidth - margin.right - margin.left
	const height = window.innerHeight - margin.top - margin.bottom

	const svg = div.append('svg')
		.attr('width', width + margin.left + margin.right)
	  .attr('height', height + margin.top + margin.bottom)
	  .append('g')
	  	.attr('transform', `translate(${margin.left}, ${margin.top})`)

	// Format the dates
	const parseTime = d3.timeParse('%Y-%m-%d')
	const dataFormatted = data.map(d => {
		return { date: parseTime(d.date), value: +d.value }
	})

	// Using scaleTime which is similar to scaleLinear but for dates
	const xScale = d3.scaleTime()
									 .domain(d3.extent(dataFormatted, d => d.date))
	                 .range([0, width])

	const yScale = d3.scaleLinear()
									 .domain([0, d3.max(dataFormatted.map(d => d.value))])
	                 .range([height, 0])

	const xAxis = svg.append('g')
									 .attr('class', 'x axis')
	                 .attr('transform', `translate(0, ${height})`)
									 .call(d3.axisBottom(xScale))
	                 .selectAll('text')
	                  .style('text-anchor', 'end')
	                  .attr('dx', '-.8em')
	                  .attr('dy', '.15em')
	                  .attr('transform', 'rotate(-65)')


	const yAxis = svg.append('g')
									 .attr('class', 'y axis')
									 .call(d3.axisLeft(yScale))
	                 .append('text')
	                 .attr('x', 0)
	                 .attr('y', -15)
	                 .text('Orders')

	const line = d3.line()
								 .x(d => xScale(d.date))
	               .y(d => yScale(d.value))
	               .curve(d3.curveCardinal)

	svg.append('path')
		.datum(dataFormatted)
	  .attr('class', 'line')
	  .attr('d', line)
		.style('stroke', '#0D5D8B')
	  .style('fill', 'none')
	  .style('stroke-width', 2)
}

d3.csv('/data/time-line-chart.csv')
	.then(data => {
		const dataset = data.map(d => {
			return { date: d.date, value: +d.value  }
		})
		main(dataset)
	})
	.catch(err => console.error(err))
