'use strict'

export const table = data => {
  const keys = Object.keys(data[0])
  const table = d3.select('#app').append('table')

  const header = table.append('thead').attr('class', 'table-header')
    .append('tr').attr('class', 'table-row-head')
    .selectAll('.table-data')
    .data(keys)
    .enter().append('th')
    .attr('class', 'table-head')
    .text(d => d)

  const rows = table.selectAll('.table-row')
      .data(data)
    .enter().append('tr')
      .attr('class', 'table-row')
    .selectAll('td')
        .data(d => Object.values(d))
      .enter().append('td')
        .attr('class', 'table-data')
      .text(d2 => d2)
}
