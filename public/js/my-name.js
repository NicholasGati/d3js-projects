'use strict'
const div = d3.select('#app')
const margin = {
	top: window.innerHeight / 4,
	right: 0,
	bottom: 0,
	left: window.innerWidth / 3
}
const width  = window.innerWidth - margin.left - margin.right
const height = window.innerHeight - margin.top - margin.bottom

const curves = [
	'curveLinear',
  'curveBasis',
  'curveBundle',
  'curveCardinal',
  'curveCatmullRom',
  'curveMonotoneX',
  'curveMonotoneY',
  'curveNatural',
  'curveStep',
  'curveStepAfter',
  'curveStepBefore',
  'curveBasisClosed'
]

const strokeWidth = 4
const theCurve = d3[curves[6]]
const purple = '#A56BCF'
const yellow = '#FFD62B'

const svg = div.append('svg')
	.attr('width', width + margin.left + margin.top)
  .attr('height', height + margin.top + margin.bottom)
	.append('g')
  .attr('transform', `translate(${margin.left}, ${margin.top})`)

const line = d3.line()
	.x(d => d[0])
  .y(d => d[1])
  .curve(theCurve)

/*
 * All Data for letters and underline.
 */
const N = [
	[50,  300],
  [75,  100],
  [100, 300],
  [125, 50 ]
]

const I = [
	[150, 300],
  [155, 190]
]

const I_Dot = [
	[155, 170],
  [158, 155]
]

const C = [
	[250, 210],
  [215, 195],
  [190, 210],
  [190, 275],
  [215, 300],
  [245, 280]
]

const K = [
	[290, 305],
  [300, 120],
  [308, 100],
  [295, 210],
  [370, 300],
  [298, 210],
  [380, 150]
]

const underline = [
	[30,  350],
  [450, 310]
]

const allData = [
	{
  	data: N,
    wait: 0,
    strokeWidth: strokeWidth,
    strokeColor: purple
  },
  {
  	data: I,
    wait: 1000,
    strokeWidth: strokeWidth,
    strokeColor: purple
  },
  {
  	data: I_Dot,
    wait: 1800,
    strokeWidth: strokeWidth,
    strokeColor: yellow
  },
  {
  	data: C,
    wait: 2300,
    strokeWidth: strokeWidth,
    strokeColor: purple
  },
  {
  	data: K,
    wait: 2800,
    strokeWidth: strokeWidth,
    strokeColor: purple
  },
  {
  	data: underline,
    wait: 3500,
    strokeWidth: strokeWidth * 2,
    strokeColor: yellow
  }
]

const drawLetter = data => {
  const letter = svg.append('path')
    .datum(data.data)
    .attr('class', 'glowed')
    .style('fill', 'none')
    .style('stroke', data.strokeColor)
    .style('stroke-width', data.strokeWidth)
    .attr('d', line)

  const letterLength = letter.node().getTotalLength()

  letter.attr('stroke-dasharray', `${letterLength} ${letterLength}`)
    .attr('stroke-dashoffset', letterLength)
    .transition().duration(800)
    .delay(data.wait)
    .ease(d3.easeSinOut)
    .attr('stroke-dashoffset', 0)
}

allData.map(drawLetter)

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
