'use strict'

const div = d3.select('#app')
const height = window.innerHeight
const width = window.innerWidth
const radius = (Math.min(height, width) / 2) * 0.9
const colorScale = d3.scaleOrdinal([
'#FFD62B', '#A56BCF', '#00A0B0', '#245B6E', '#1C9FE9'
])
const data = [14.5, 28, 17, 32.5, 8]

const svg = div.append('svg')
	.attr('height', height)
  .attr('width', width)
  .style('background-color', '#0E0B16')
  .append('g')
  .attr('transform', `translate(${width / 2}, ${height / 2})`)

const pie = d3.pie().value(d => d).sort(null)

/*
 * Arc: Generates path data for an arc.
 * Arc generators produce path data from angle
 * and radius values.
 *
 * If you want a donut chart,
 * try innerRadius(radius / 2)
 */
const arc = d3.arc()
	.outerRadius(radius)
	.innerRadius(0)

// This is the size of the arc on hover
const hoverArc = d3.arc()
	.outerRadius(radius + 25)
  .innerRadius(0)

const labelArc = d3.arc()
	.outerRadius(radius)
	.innerRadius(radius / 2.5)

 const g = svg.selectAll('.arc')
	.data(pie(data))
  .enter().append('g')
  .attr('class', 'arc')

 g.append('path')
    .attr('d', arc)
    .attr('class', 'glowed')
    .style('fill', (d, i) => colorScale(i))
    .style('fill-opacity', 0.8)
    .style('stroke', '#0E0B16')
    .style('stroke-width', 10)
    .on('mouseover', function() {
      d3.select(this)
      	.style('fill-opacity', 1)
      	.transition()
        .duration(500)
        .attr('d', hoverArc)
    })
 		.on('mouseout', function() {
      d3.select(this)
      	.style('fill-opacity', 0.8)
      	.transition()
        .duration(500)
        .attr('d', arc)
  	})

/*
 * This is the text layer.
 */
g.append('text')
  .attr('transform', d => `translate(${labelArc.centroid(d)})`)
  .attr('dy', '0.3em')
  .text(d => `${d.data}%`)
  .style('font-size', 24)
  .style('fill', '#FFF')
  .style('text-shadow', '2px 2px #0E0B16')
  .style('text-anchor', 'middle')

 /*
 * Glow effects (Optional)
*/
const defs = svg.append('defs')
const glowDeviation = 3.5

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
