'use strict'

const div = d3.select('#app')
const margin = { top: 0, right: 0, bottom: 0, left: 0 }
const width = window.innerWidth - margin.right - margin.left
const height = window.innerHeight - margin.top - margin.bottom
const colorScale = d3.scaleOrdinal(d3.schemePastel2)

const dataset = Array(2000).fill().map(() => {
 	return {
 		cx: Math.round(Math.random() * width),
 		cy: Math.round(Math.random() * height)
 	}
})

const easing = [
 'easeElastic',
 'easeBounce',
 'easeLinear',
 'easeSin',
 'easeQuad',
 'easeCubic',
 'easePoly',
 'easeCircle',
 'easeExp',
 'easeBack'
]

const svg = div.append('svg')
	.attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  	.attr("transform", `translate(${margin.left}, ${margin.top})`);

const circles = svg.selectAll('.circle2')
  .data(dataset)
  .enter().append('circle')
  .attr('class', 'circle')
  .attr('cx', d => d.cx)
  .attr('cy', d => 0)
  .attr('r', 0)
  .transition()
  .ease(d3[easing[1]])
  .duration(1500)
  .delay((d, i) => i * 2)
  .attr('cy', d => d.cy)
  .attr('r', 3)
  .style('fill', (d, i) => colorScale(i))
  .style('stroke',  (d, i) => colorScale(i))

/*
 * The hollow circle that surrounds the filled circle.
 */
const circles2 = svg.selectAll('.circle2')
  .data(dataset)
  .enter().append('circle')
  .attr('class', 'circle2')
  .attr('cx', d => d.cx)
  .attr('cy', d => 0)
  .attr('r', 0)
  .transition()
  .ease(d3[easing[1]])
  .duration(1500)
  .delay((d, i) => i * 2)
  .attr('cy', d => d.cy)
  .attr('r', 6)
  .style('fill', 'none')
  .style('stroke',  (d, i) => colorScale(i))
