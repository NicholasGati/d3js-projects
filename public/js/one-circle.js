'use strict'

// The SVG container
const svg = d3.select('body')
							.style('margin', 0)
							.append('svg')
              .attr('width',  window.innerWidth)
              .attr('height', window.innerHeight)
              .style('background-color', '#011D38')

// A single white circle
const circle = svg.append('circle')
									.attr('cx', window.innerWidth / 2)
                  .attr('cy', window.innerHeight / 2)
                  .attr('r', 100)
                  .style('fill', '#FFF')

/*
* What do you need for a circle?
* 1. Something to draw on: SVG
* 2. cx (center x) coordinate
* 3. cy (center y) coordinate
* 4. r (radius)
* 5. fill - a color so you can see it
*/
