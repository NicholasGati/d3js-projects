'use strict'
const div = d3.select('#app')
const margin = { top: 20, right: 20, bottom: 20, left: 20 }
const width = window.innerWidth - margin.right - margin.left
const height = window.innerHeight - margin.top - margin.bottom
const colorScale = d3.scaleOrdinal(d3.schemePastel1)

const data = Array(3000).fill().map(() => {
	return {
    cx: Math.round(Math.random() * width),
    cy: Math.round(Math.random() * height)
  }
})

const svg = div.append('svg')
	.attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
	.append('g')
	.attr('transform', `translate(${margin.left}, ${margin.bottom})`)

const circles = svg.selectAll('circle')
	.data(data)
  .enter().append('circle')
  .attr('cx', d => d.cx)
  .attr('cy', d => d.cy)
  .attr('r', 0)
  .transition()
  .duration(1000)
  .delay((d, i) => i * 2)
  .attr('r', (d, i) => {
    if (i % 25 === 0) {
      return 10
    } else if (i % 55 === 0) {
      return 25
    } else if (i % 72 === 0) {
      return 35
    } else {
      return 3
    }
  })
  .style('fill', 'none')
  .style('stroke-width', 1)
  .style('stroke', (d, i) => colorScale(i))
