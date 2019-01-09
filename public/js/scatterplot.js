'use strict'

/*
* What we need for this visualization:
* * Data
* * X & Y Scales
* * X and Y Axis
* * Bubbles!!!
*/

const main = data => {
  // Get the DIV and set up margins, width, height
  const div = d3.select('#app')
  const margin = { top: 100, right: 50, bottom: 100, left: 75 }
  const width = window.innerWidth - margin.right - margin.left
  const height = window.innerHeight - margin.top - margin.bottom

  // Create the SVG for us to draw the visualization onto
  const svg = div.append('svg')
  	.attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .style('background-color', '#011D38')
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)

  /*
   * X and Y scales.
   */
  const xScale = d3.scaleLinear()
  	.domain(d3.extent(data, d => d.num_products))
    .range([0, width])

  const yScale = d3.scaleLinear()
  		.domain(d3.extent(data, d => d.orders))
      .range([height, 0])

  /*
   * X and Y axis
   */
  const xAxis = svg.append('g')
  	.attr('class', 'x axis')
    .attr('transform', `translate(0, ${height})`)
    .call(d3.axisBottom(xScale))
    	.append('text')
      .attr('x', width / 2)
      .attr('y', 30)
      .attr('dy','0.71em')
  		.attr('text-anchor', 'middle')
      .text('Number of Products')

  const yAxis = svg.append('g')
  	.attr('class', 'y axis')
    .call(d3.axisLeft(yScale))
      .append('text')
      .attr('x', -15)
      .attr('y', -20)
      .attr('dy','0.71em')
      .attr('text-anchor', 'middle')
      .text('Orders')


  /*
  * Add the data points as bubbles
  */
  const circles = svg.selectAll('circle')
  	.data(data)
    .enter()
    .append('circle')
    .attr('class', 'circle')
    .attr('cx', d => xScale(d.num_products))
    .attr('cy', d => yScale(d.orders))
    .attr('r', 0)
    .style('fill', '#0D5D8B')
    .style('fill-opacity', .5)
    .style('stroke', '#0D5D8B')
    .style('stroke-width', 2)

  circles.on('mouseover', function () {
  	const circle = d3.select(this)
    circle.transition()
    			.duration(250)
    			.style('fill-opacity', 1)
  })

  circles.on('mouseout', function () {
  	const circle = d3.select(this)
    circle.transition()
    			.duration(250)
    			.style('fill-opacity', .5)
  })

  circles.transition()
         .duration(900)
         .delay((d, i) => i * 50)
         .attr('r',  d => {
           	const total = data.reduce((acc, cur) => acc + cur.sales, 0)
           	return (d.sales / total) * 100
         })
}

const testing = d3.csv('/data/scatterplot.csv')
  .then(data => {
    const formattedData = data.map(d => {
      return { num_products: +d.num_products,
        sales: +d.sales,
        orders: +d.orders
      }
    })
    main(formattedData)
  })
  .catch(err => console.error(err))
