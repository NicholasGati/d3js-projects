'use strict'

// Functions which assist in preparing our data
const parseTime = d3.timeParse('%Y-%m-%d')

// const colors = d3.schemePastel1

const colors = d3.scaleLinear()
                 .domain([0, 2000, 2500, 3000,2500, 4000, 4500, 7000])
                 .range(['#4046BF', '#FFA739', '#07507F', '#FFCB39', '#307FB3', '#C66E00', '#FFE089', '#878BDF'])
                 .interpolate(d3.interpolateHclLong)

const formatDateAndNumbers = data => {
  return data.map(d => {
    const newDate = new Date(d.date)
    return {
      date: new Date(newDate.getFullYear(), newDate.getMonth(), 1),
      car: d.car,
      orders: +d.orders
    }
  })
}

const sortByDate = direction => data => {
  switch (direction) {
    case 'asc':
      return data.sort((a, b) => a.date - b.date)
      break;
    case 'desc':
      return data.sort((a, b) => b.date - a.date)
      break
  }
}
const sortByDateAsc  = sortByDate('asc')
const sortByDateDesc = sortByDate('desc')

const groupByMonthAndYear = data => {
  return d3.nest().key(d => d.date).entries(data)
}

const sumOrdersByCar = data => {
  return data.map(d => {
    const totals = d.values.reduce((acc, cur) => {
      acc[cur.car] = acc[cur.car] ? acc[cur.car] + cur.orders : cur.orders
      return acc
    }, {})
    return Object.assign({}, { date: d.key }, totals)
  })
}

const prepareData = data => {
  const prepared = formatDateAndNumbers(data)
  const sorted   = sortByDateAsc(prepared)
  const grouped  = groupByMonthAndYear(sorted)
  return sumOrdersByCar(grouped)
}

const getMax = (car, data) => {
  console.log(d3.max(data, d => d[car]))
  return d3.max(data, d => d[car])
}

const carsList = data => {
  return data.reduce((acc, cur) => {
      if (!acc.includes(cur.car)) acc.push(cur.car)
      return acc
  }, [])
}

const area = (scales, selection) => {
  return d3.area()
           .x(d => scales.x(new Date(d.date)))
           .y0(scales.y(0))
           .y1(d => d[selection] ? scales.y(d[selection]) : scales.y(0))
           .curve(d3.curveMonotoneX)
}

const main = rawData => {
  // Our main SVG setup on which we will drae our visualization
  const div    = d3.select('#app')
  const margin = { top: 125, right: 130, bottom: 130, left: 125 }
  const width  = window.innerWidth - margin.left - margin.right
  const height = window.innerHeight - margin.top - margin.bottom
  const svg    = div.append('svg')
                 .attr('width', width + margin.left + margin.top)
                 .attr('height', height + margin.top + margin.bottom)
                 .style('background-color', '#11141C')
               .append('g')
                  .attr('transform', `translate(${margin.left}, ${margin.top})`)

  /*
  * First prepare our data so it makes more sense.
  * Turn number strings into actual numbers and
  * * date strings into date objects.
  * Group the data by month and year.
  * Sum all of the orders by car.
  *
  * Result will be a smaller data set that has the
  * * total orders per car maker by date.
  */
  const data = prepareData(rawData)
  const cars = carsList(rawData)

  const x = d3.scaleTime()
              .domain(d3.extent(data, d => new Date(d.date)))
              .range([0, width])

  const y = d3.scaleLinear()
              .domain([0, getMax(cars[0], data)]).nice()
              .range([height, 0])

  const xAxis = svg.append('g')
                      .attr('class', 'x axis')
                      .attr('transform', `translate(0, ${height})`)
                      .call(d3.axisBottom(x).ticks(d3.timeMonth.every(3)))
                      .selectAll('text')
     	                  .style('text-anchor', 'end')
     	                  .attr('dx', '-.8em')
     	                  .attr('dy', '.15em')
     	                  .attr('transform', 'rotate(-65)')

// Add x axis text below x axis
 d3.select('.x').append('text')
   .attr('x', width / 2)
   .attr('y', 75)
   .style('text-anchor', 'middle')
   .style('fill', '#FFF')
   .text('Yearly Quarters from 2008 to 2018')

  const yAxis = svg.append('g')
                     .attr('class', 'y axis')
                     .call(d3.axisLeft(y))
                  .append('text')
                      .attr('x', -20)
                      .attr('y', -15)
                      .style('text-anchor', 'middle')
                      .style('fill', '#FFF')
                      .text('Orders')

  svg.append('text')
     .attr('class', 'title')
     .text(`Car orders for ${cars[0]}`)
     .attr('x', width / 2)
     .attr('y', -25)
     .style('fill', colors(getMax(cars[0], data)))
     .style('opacity', 1)
     .style('font-size', 24)
     .style('text-decoration', 'underline')
     .style('text-anchor', 'middle')

  svg.append('path')
     .datum(data)
     .attr('class', 'area')
     .style('fill', colors(getMax(cars[0], data)))
     .style('stroke', colors(getMax(cars[0], data)))
     .style('stroke-width', 1)
     .attr('d', area({x, y}, cars[0]))

  const update = selection => {
    // Update the Y Axis
    y.domain([0, getMax(selection, data)]).nice()
    d3.select('.y').transition().duration(1000).call(d3.axisLeft(y))
    d3.select('.y').exit().remove()

    // Update the Area path
    d3.select('.area')
      .transition().duration(1000)
      .attr('d', area({x, y}, selection))
      .style('fill', colors(getMax(selection, data)))
      .style('stroke', colors(getMax(selection, data)))

    // Exit and remove any unneeded data
    d3.select('.area').exit().remove()

    // Update the title text
    d3.select('.title')
      .transition().duration(500)
      .style('opacity', 0)
      .transition().duration(500)
      .style('opacity', 1)
      .style('fill', colors(getMax(selection, data)))
      .text(`Car orders for ${selection}`)
  }

 // Create the selectable options list of cars
 const select = div.append('div')
                  .attr('class', 'car-selection')
                  .append('select')
                   .on('change', function () {
                     const select = d3.select(this).node()
                     update(select[select.selectedIndex].value)
                   })

 select.selectAll('option')
       .data(cars)
       .enter().append('option')
       .attr('value', d => d)
       .text(d => d)
       .style('fill', '#FFF')
}

const getData = filename => {
  d3.csv(filename)
    .then(main)
    .catch(err => console.error(err))
}
getData('/data/area-chart-2.csv')
