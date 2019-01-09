'use strict'
const div = d3.select('#app')
const margin = { top: 100, right: 50, bottom: 90, left: 75 }
const width = window.innerWidth - margin.right - margin.left
const height = window.innerHeight - margin.top - margin.bottom

const maxY = 1
const data = Array(15).fill().map(() => d3.randomUniform(maxY)())

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

const svg = div.append('svg')
	.attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .style('background-color', '#11141C')
  .append('g')
  .attr('transform', `translate(${margin.left}, ${margin.top})`)

/*
 * X and Y scales.
 */
const xScale = d3.scaleLinear()
	.domain([0, data.length - 1])
  .range([0, width])

const yScale = d3.scaleLinear()
		.domain([0, maxY])
    .range([height, 0])

/*
 * The function that describes how the line is drawn.
 * Notice that we apply the xScale and yScale to the
 * data in order to keep the data in bounds to our scale.
 * IMPORTANT: y from the original line chart becomes y1 in
 * this chart because we need to add y0 for the fill.
 */
const area = d3.area()
	.x((d, i) => xScale(i))
  .y(d => yScale(d))
  .curve(d3[curves[9]])


/*
 * X and Y axis
 */
const xAxis = svg.append('g')
	.attr('class', 'x axis')
  .attr('transform', `translate(0, ${height})`)
  .call(d3.axisBottom(xScale))

const yAxis = svg.append('g')
	.attr('class', 'y axis')
  .call(d3.axisLeft(yScale))

/*
 * Appending the line to the SVG.
 */
const path = svg.append('path')
	.datum(data)
  .attr('class', 'data-line glowed')
  .style('stroke','#FFD62B')
  .style('stroke-width', 1)
  .style('fill', 'none')
  .style('fill-opacity', 0.15)
  .attr('d', area)

/*
 * In order to animate the drawing of the path,
 * you have to get its total length and use
 * it as attributes like so:
 */
const totalLength = path.node().getTotalLength()
path
	.attr('stroke-dasharray', `${totalLength} ${totalLength}`)
	.attr('stroke-dashoffset', totalLength)
  .transition().duration(9000)
  .ease(d3.easeQuad)
  .attr('stroke-dashoffset', 0)

/*
 * Add little circles at data points.
 */
const circles = svg.selectAll('circle')
	.data(data)
  .enter()
  .append('circle')
  .attr('class', 'circle')
  .attr('cx', (d, i) => xScale(i))
  .attr('cy', -150)
  .attr('r', 10)
  .style('fill', '#FFD62B')
  .style('stroke', '#11141C')
  .style('stroke-width', 2)

/*
* Event listeners must be attached prior to transitions.
* If they're attached after the transition, it will throw
* an error. This is because when added after the transition,
* the event listener references the "transition" selection
* instead of the selection that you're assuming it'll reference.
*/
circles.on('mouseover', function () {
	const circle = d3.select(this)
  circle.transition()
  			.duration(250)
  			.attr('r', 10)
})

circles.on('mouseout', function () {
	const circle = d3.select(this)
  circle.transition()
  			.duration(250)
  			.attr('r', 5)
})

circles.transition().duration(800)
	.attr('r', 5)
  .delay((d, i) => i * 300)
  .attr('cy', d => yScale(d))


/*
 * Glow effects (Optional)
 */
const defs = svg.append('defs')
const glowDeviation = '4.5'

// Filter for the outside glow
const filter = defs.append('filter').attr('id', 'glow')
filter.append('feGaussianBlur')
    .attr('stdDeviation', glowDeviation)
    .attr('result', 'coloredBlur')

const feMerge = filter.append('feMerge')
feMerge.append('feMergeNode').attr('in', 'coloredBlur')
feMerge.append('feMergeNode').attr('in', 'SourceGraphic')

// Add the glow!!
d3.selectAll('.glowed').style('filter', 'url(#glow)')
