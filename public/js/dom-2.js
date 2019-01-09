'use strict'
'use strict'

// Select the main containing element
const app = d3.select('#app')

/*
* This function can be partially applied
* so that it's easy to create reusable functions
* to create our DOM elements.
*/
const addElement = parent => type => attrs => {
  return parent.append(type)
    .attr('class', attrs.class)
    .attr('id', attrs.id)
    .text(attrs.text)
}
const addToApp 	= addElement(app)
const addButton = addToApp('button')
const addDiv 		= addToApp('div')

// Create out container which will hold our blocks
const container = addDiv({
	class: 'container',
  id: 'main-container',
  text: ''
})

// Create the button that we will click to add a block
const button = addButton({
	class: 'button',
  id: 'add-block',
  text: 'Click Me'
})

const addToContainer = addElement(container)

/*
* While I don't like to alter outside state such as
* this counter, for our purposes here, it's fine.
* The button click calls the function which creates
* a new block.
*/
let counter = 0
button.on('click', () => {
	addToContainer('div')({
    class: 'block',
    id: '',
    text: ++counter
  })

  const blocks = d3.selectAll('.block')
  listener(blocks)
})

/*
* D3.js click listener on all elements with class 'block'
*
* Important! In D3.ks, element.style('color') will return
* an rgb value...NOT a hex value
*
* const fn = () => {} vs function fn () {}
* * function fn () {} is hoisted via function hoisting. const fn is NOT.
* * One of the trickier aspects of JavaScript for new JavaScript developers
* * is the fact that variables and functions are "hoisted". Rather than
* * being available after their declaration, they might actually be
* * available beforehand. That is why I am choosing function listener () {}
* * here instead.
*/
function listener (b) {
  b.on('click', function () {
    const block  = d3.select(this)
    const color1 = 'rgb(97, 202, 212)', color2 = 'rgb(255, 6, 6)'
    const color  = block.style('color') === color1 ? color2 : color1
  	block.style('color', color)
  })

  /*
  * D3.js 'mouseover' and 'mouseout' listeners enable us to
  * perform actions on hovering
  */
  b
    .on('mouseover', function () {
      const block  = d3.select(this)
      block.style('border', '2px solid rgb(97, 202, 212)')
    })
    .on('mouseout', function () {
    	const block  = d3.select(this)
     	block.style('border', '2px solid rgb(255, 255, 255)')
    })
}

/*
 * Select all elements with the class 'block'
*/
const blocks = d3.selectAll('.block')
listener(blocks)
