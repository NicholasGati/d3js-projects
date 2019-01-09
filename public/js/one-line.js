'use strict'

// Prepare our width and height
const width =  window.innerWidth
const height =  window.innerHeight

// Prepare our data
const coordinates = [
  { x: width / 4, 		  y: height / 2 },
  { x: (width / 4) * 3, y: height / 2}
]

// Select the body and add an SVG
const svg = d3.select('body')
							.style('margin', 0)
							.append('svg')
              .attr('width', width)
              .attr('height', height)
              .style('background-color', '#011D38')

// The line generator function
const line = d3.line()
							.x(d => d.x)
              .y(d => d.y)

/*
* Add the line to the SVG as a path
*
* We are using 'datum' as opposed to 'data'.
* When you join data to a selection via '.data',
* the number of elements in your data array
* should match the number of elements in the selection.
* Sincel we have 2 coordinates but want those
* 2 coordinates to draw ONE SVG element, PATH,
* we can use '.datum' which binds data directly
* without computing a join.
*/
const path = svg.append('path')
	.datum(coordinates)
  .style('fill', 'none')
  .style('stroke', '#FFF')
  .style('stroke-width', 10)
  .attr('d', line)

/*
* What do we need to draw a line?
*
* 1. An SVG to draw on
* 2. Data to draw
* 3. A line generator which describes the x/y points
* 4. The line's path
*/
