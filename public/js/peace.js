const div = d3.select('#app')
const height = window.innerHeight
const width = window.innerWidth
const radius = Math.min(width, height) / 2
const colorScale = d3.scaleOrdinal(['#7326AB', '#2A59A9', '#E5A1D4', '#00A0B0'])
const strokeWidth = 4
const data = [35, 15, 15, 35]

const svg = div.append('svg')
	.attr('width', width)
  .attr('height', height)
  .style('background-color', '#11141C')
  .append('g')
  .attr('transform', `translate(${width / 2}, ${height / 2})`)

/* Since D3.js automatically sorts by value for pie charts,
* we will use sort(null) so that the data is NOT sorted and
* we get it in the order that we specify.
*/
const pie = d3.pie().value(d => d).sort(null)

/*
 * Arc generators are functions that produce
 * path data from angles and radius values.
 */
const arc = d3.arc()
	.outerRadius(radius * 0.75)
  .innerRadius(0)

 const g = svg.selectAll('.arc')
	.data(pie(data))
  .enter().append('g')
  .attr('class', 'arc')

g.append('path')
    .attr('d', arc)
    .style('fill', (d, i) => colorScale(i))
    .style('stroke', '#11141C')
    .style('stroke-width', strokeWidth)
    .attr('class', 'arc glowed')

/*
 * Glow effects (Optional)
*/
const defs = svg.append('defs')
const glowDeviation = 4.5

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
