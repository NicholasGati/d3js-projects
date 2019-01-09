'use strict'

const app = d3.select('#app')

const addElement = parent => type => attrs => {
  return parent.append(type)
    .attr('class', attrs.class)
    .attr('id', attrs.id)
    .text(attrs.text)
}
const addToApp 	= addElement(app)
const addButton = addToApp('button')
const addDiv 		= addToApp('div')

const container = addDiv({
	class: 'container',
  id: 'main-container',
  text: ''
})

const button = addButton({
	class: 'button',
  id: 'add-block',
  text: 'Click Me'
})

const addToContainer = addElement(container)

/*
* Listener to remove the clicked element.
* This attached the "click" listener onto
* the element and then defines the action
* upon clicking.
*/
const removeOnClick = element => {
	element.on('click', function () {
  	d3.select(this)
    	.transition().duration(1000)
      .style('opacity', 0)
    	.remove()
  })
}

let counter = 0
button.on('click', () => {
	const element = addToContainer('div')({
    class: 'block',
    id: '',
    text: ++counter
  })

  removeOnClick(element)
})


/*
* The code here is just to simulate clicks for JSFiddle's preview so it doesn't look like a blank fiddle lol
*/
new Array(7).fill(0).map(_ => button.on('click')())
