'use strict'

const div = d3.select('#app')
const height = window.innerHeight
const width = window.innerWidth
const radius = (Math.min(height, width) / 2) * 0.9
const colorScale = d3.scaleOrdinal(d3.schemeSet3)
const data = [12, 6, 15, 4, 28, 5, 14, 4, 7, 5]

const svg = div.append('svg')
	.attr('height', height)
  .attr('width', width)
  .style('background-color', '#0E0B16')
  .append('g')
  .attr('transform', `translate(${width / 2}, ${height / 2})`)

const pie = d3.pie().value(d => d).sort(null)

/*
 * Add the arcs for:
 * - default
 * - hover
 * - text labels
 */
const zeroArc = d3.arc()
	.innerRadius(0)
  .outerRadius(1)
  .cornerRadius(1)

const arc = d3.arc()
	.innerRadius(0)
  .outerRadius(radius)
  .cornerRadius(radius)

const hoverArc = d3.arc()
	.innerRadius(0)
  .outerRadius(radius + 30)
  .cornerRadius(radius + 30)

const labelArc = d3.arc()
	.innerRadius(radius / 1.4)
  .outerRadius(radius)

/*
 * Now that we have the arcs, let's append them.
*/
const g = svg.selectAll('.arc')
	.data(pie(data))
  .enter().append('g')
  .attr('class', 'arc')

g.append('path')
	.attr('d', zeroArc)
  .attr('class', 'glowed')
  .style('fill', (d, i) => colorScale(i))
  .style('fill-opacity', 0.7)
  .style('stroke-width', 5)
  .style('stroke', '#0E0B16')
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
    .transition().duration(1000).delay((d, i) => i * 300)
    .attr('d', arc)

/*
 * Let's add the text labels for each "pedal"
*/
const text = g.append('text')
	.attr('transform', d => `translate(${labelArc.centroid(d)})`)
  .attr('dy', '0.3em')
  .text(d => `${d.data}%`)
  .style('font-size', 24)
  .style('font-family', 'cursive')
  .style('fill', '#FFF')
  .style('fill-opacity', 0)
  .style('text-shadow', '2px 2px #0E0B16')
  .style('text-anchor', 'middle')
  .transition().duration(3000)
  .delay((d, i) => i * 300)
  .style('fill-opacity', 1)


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
