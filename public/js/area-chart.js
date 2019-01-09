'use strict'
const div = d3.select('#app')
const margin = { top: 100, right: 50, bottom: 90, left: 75 }
const width = window.innerWidth - margin.right - margin.left
const height = window.innerHeight - margin.top - margin.bottom

const maxY = 1000
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
  .y0(yScale(0))
  .y1(d => yScale(d))
  .curve(d3[curves[4]])


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
svg.append('path')
	.datum(data)
  .attr('class', 'data-line glowed')
  .style('stroke','#00A0B0')
  .style('stroke-width', 2)
  .style('fill', '#00A0B0')
  .style('fill-opacity', 0.15)
  .attr('d', area)

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
  .style('fill', '#00A0B0')
  .style('stroke', '#11141C')
  .style('stroke-width', 2)
  .transition().duration(800)
	.attr('r', 5)
  .delay((d, i) => i * 80)
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
