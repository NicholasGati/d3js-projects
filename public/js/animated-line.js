'use strict'

const div = d3.select('#app')
const margin = { top: 50, right: 75, bottom: 90, left: 75 }
const width = window.innerWidth - margin.right - margin.left
const height = window.innerHeight - margin.top - margin.bottom

const svg = div.append('svg')
	.attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .style('background-color', '#E5A1D4')
  .append('g')
  .attr('transform', `translate(${margin.left}, ${margin.bottom})`)

const data = Array(50).fill().map(() => d3.randomUniform(1)())
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
 * X and Y scales.
 */
const xScale = d3.scaleLinear()
	.domain([0, data.length - 1])
  .range([0, width])

const yScale = d3.scaleLinear()
		.domain([0, 1])
    .range([height, 0])

/*
 * The function that describes how the line is drawn.
 * Notice that we apply the xScale and yScale to the
 * data in order to keep the data in bounds to our scale.
 */
const line = d3.line()
	.x((d, i) => xScale(i))
  .y(d => yScale(d))
  .curve(d3[curves[11]])

/*
 * Appending the line to the SVG.
 */
const path = svg.append('path')
	.datum(data)
  .style('stroke',  ' #FFFFFF')
  .style('stroke-width', 2)
  .style('fill', 'none')
  .attr('d', line)


/*
 * In order to animate the drawing of the path,
 * you have to get its total length and use
 * it as attributes like so:
 */
const totalLength = path.node().getTotalLength()
path
	.attr('stroke-dasharray', `${totalLength} ${totalLength}`)
	.attr('stroke-dashoffset', totalLength)
  .transition().duration(10000)
  .ease(d3.easeQuad)
  .attr('stroke-dashoffset', 0)
  /* .on('end', repeat); */
