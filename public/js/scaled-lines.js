'use strict'

const div = d3.select('#app')
const margin = { top: 50, right: 250, bottom: 90, left: 250 }
const width = window.innerWidth - margin.right - margin.left
const height = window.innerHeight - margin.top - margin.bottom

const svg = div.append('svg')
	.attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', `translate(${margin.left}, ${margin.bottom})`)

const data = Array(25).fill().map(() => d3.randomUniform(1)())
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
  .curve(d3[curves[3]])

/*
 * Appending the line to the SVG.
 */
svg.append('path')
	.datum(data)
  .style('stroke',  '#ffab00')
  .style('stroke-width', 2)
  .style('fill', 'none')
  .attr('d', line)


/*
The D3.js scales are:

Identity: a special kind of linear scale, 1:1, good for pixel values. input == output

Linear: transforms one value in the domain interval into a value in the range interval

Power and Logarithmic scales: sqrt, pow, log – used for exponentially increasing values

Quantize and Quantile scales: for discrete sets of unique possible values for inputs or outputs

Ordinal: for non quantitative scales, like names, categories, etc.

----------

The Quantitative scales have a continuous domain such as dates, times, real numbers, etc...

The Ordinal scales are for discrete domains - like names, categories, colors, etc...
*/
