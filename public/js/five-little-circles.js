'use strict'

const data = [1, 2, 3, 4, 5]

const colors = d3.schemePastel1
const margin = { top: 50, right: 50, bottom: 50, left: 50 }
const width = window.innerWidth - margin.right - margin.left
const height = window.innerHeight - margin.top - margin.bottom

const div = d3.select('#app')
const svg = div.append('svg')
	.attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .style('background-color', colors[5])
  .append('g')
  .attr('transform', `translate(${margin.left}, ${margin.top})`)

const circles = svg.selectAll('.circle')
	.data(data)
  .enter().append('circle')
	.attr('class', 'circle')
	.attr('cx', (d, i) => ((i * 200) + 100))
  .attr('cy', height / 2)
  .attr('r', (d, i) => (i * 10) + 15)
  .style('fill', (d, i) => colors[i])
