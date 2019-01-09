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
})


/*
* The code here is just to simulate clicks for JSFiddle's preview so it doesn't look like a blank fiddle lol
*/
new Array(7).fill(0).map(_ => button.on('click')())
