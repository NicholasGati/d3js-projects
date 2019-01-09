'use strict'

/*
 * Basic DIV and SVG setup
 */
const div = d3.select('#app')
const margin = { top: 0, right: 0, bottom: 0, left: 0 }
const width = window.innerWidth - margin.left - margin.right
const height = window.innerHeight - margin.top - margin.bottom
const svg = div.append('svg')
	.attr('width', width + margin.left + margin.bottom)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  	.attr('transform', `translate(${margin.left}, ${margin.bottom})`)

const data = Array(40).fill().map(() => {
	return {
  	x: Math.round(Math.random() * width),
    y: Math.round(Math.random() * height)
  }
})

const sortedData = data.sort((a, b) => d3.ascending(a.x, b.x))

/*
 * Line curve types
 */
const curves = [
	'curveLinear',
  'curveBasis',
  'curveBundle',
  'curveCardinal',
  'curveCatmullRom',
  'curveMonotoneX',
  'curveMonotoneY',
  'curveNatural',
  'curveStep',
  'curveStepAfter',
  'curveStepBefore',
  'curveBasisClosed'
]


/*
 * This is a function that tells how to create the line.
 */
const line = d3.line()
	.x(d=> d.x)
  .y(d => d.y)
	.curve(d3[curves[9]])


/*
 * This is where the line function is used in conjunction
 * with the data to draw the line.
 */
const path = svg.append('path')
	.datum(sortedData)
  .style('fill', 'none')
  .style('stroke', '#ffab00')
  .style('stroke-width', 3)
  // .style('stroke-dasharray', 5) // dashes
  .attr('d', line)
