'use strict'
/*
* What we need for this visualization:
* * Data
* * Nodes
* * Branches/"Links"
* * Text elements
*/
const nodes = new Array(20).fill(0).map((x, i) => ({ id: i }))
const links = [
	{ source: 0,  target: 1  },
  { source: 0,  target: 2  },
  { source: 1,  target: 3  },
  { source: 1,  target: 4  },
  { source: 2,  target: 5  },
  { source: 2,  target: 6  },
  { source: 3,  target: 7  },
  { source: 3,  target: 8  },
  { source: 4,  target: 9  },
  { source: 4,  target: 10 },
  { source: 5,  target: 11 },
  { source: 5,  target: 12 },
  { source: 6,  target: 15 },
  { source: 6,  target: 16 },
  { source: 7,  target: 17 },
  { source: 7,  target: 18 },
  { source: 8,  target: 19 },
  { source: 12, target: 13 },
  { source: 12, target: 14 },
]

const margin = { top: 25, right: 25, bottom: 25, left: 25 }
const height = window.innerHeight - margin.top - margin.bottom
const width = window.innerWidth - margin.left - margin.right
const app = d3.select('#app')
const svg = app.append('svg')
							 .attr('width', width + margin.left)
               .attr('height', height + margin.top)

const link = svg.selectAll('line')
  .data(links)
  .enter().append('line')
  .attr('stroke-width', 5)
  .attr('stroke', '#C5C5C5')

const node = svg.selectAll('circle')
  .data(nodes)
  .enter().append('circle')
  .attr('r', 14)
  .attr('stroke-width', 5)
  .attr('stroke', '#E79B5D')
  .attr('fill', '#E79B5D')

/*
* Appending the text to the SVG at the same locations as the nodes.
* The text is a separate element.
*/
const text = svg.selectAll('text')
	.data(nodes)
  .enter().append('text')
  .text(d => d.id)
  .style('fill', '#FFF')
  .style('text-anchor', 'middle')
  .style('font-family', 'helvetica')

const ticked = () => {
  link.attr("x1", d => d.source.x )
      .attr("y1", d => d.source.y )
      .attr("x2", d => d.target.x )
      .attr("y2", d => d.target.y )

  node.attr('cx', d => d.x)
      .attr('cy', d => d.y)

  /*
  * x and y are absolute coordinates while dx and dy
  * are relative coordinates relative to the specified x and y
  */
  text.attr('x', d => d.x)
      .attr('y', d => d.y)
      .attr('dy', 6)
}

const fSimulation = d3.forceSimulation(nodes)
  .force('center', d3.forceCenter(width / 2, height / 2))
  .force('charge', d3.forceManyBody().strength(-125))
  .force('link', d3.forceLink())

fSimulation.nodes(nodes).on('tick', ticked)
fSimulation.force('link').links(links)



/*
* "fSimulation": Creates a new simulation with the specified
* array of nodes and no forces.
*
* forceCenter() centers the nodes as a whole.
*
* When the simulation iterates, "ticked" will be called.
* "Ticked" joins the nodes to circles and updates their positions.
*
* "ticked" does the circle creating for each node
*/
