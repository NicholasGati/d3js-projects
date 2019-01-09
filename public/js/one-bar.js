'use strict'

// Prepare our width and height
const width =  window.innerWidth
const height =  window.innerHeight
const barSize = 300

// Select the body and add an SVG
const svg = d3.select('body')
							.style('margin', 0)
							.append('svg')
              .attr('width', width)
              .attr('height', height)
              .style('background-color', '#011D38')

// Draw the bar, a.k.a 'rect'.
const bar = svg.append('rect')
							 .attr('x', (width / 2) - (barSize / 2))
               .attr('y', (height / 2) - (barSize / 2))
               .attr('width', barSize)
               .attr('height', barSize)
               .style('fill', '#FFF')

/*
* What do we need to draw a bar?
*
* 1. An SVG to draw on
* 2. A 'rect' appended to the SVG with the following:
* * 2.1 X/Y coordinates
* * 2.2 Width and Height
* * 2.3 Fill color (default black)
*/
