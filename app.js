const express = require('express')
const path = require('path')
const expressHbs = require('express-handlebars')
const routes = require('./routes/index')
const port = 3000

/*
* An ap object is instantiated on creation of the express server.
*/
const app = express()

app.engine('.hbs', expressHbs({ defaultLayout: 'layout', extname: '.hbs' }))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', '.hbs')
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', routes)

app.listen(port, () => console.log(`Listening on port: ${port}!`))

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
