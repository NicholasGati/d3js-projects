'use strict'

import { table } from './helpers.js'

// Using data in CSV format
d3.csv('/data/data-format-example.csv').then(data => table(data))

// Using data in TSV format
d3.tsv('/data/data-format-example.tsv').then(data => table(data))

// Using data in JSON format
d3.json('/data/data-format-example.json').then(data => table(data))
