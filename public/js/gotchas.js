/*
When using d3 to create and remove elements, if you’re using an array and having problems with it removing the wrong element, it’s likely because you didn’t provide a unique key for the array removal.

This:
*/
const elements = d3.selectAll('element')
  .data(data)
  .enter().append('element')
  
elements.exit.remove()

/*
Should be:
*/
const elements = d3.selectAll('element')
  .data(data, d => d.id)
  .enter().append('element')

elements.exit.remove()
