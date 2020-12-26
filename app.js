const express = require('express')
const exphbs = require('express-handlebars')
const Restaurant = require('./models/restaurant')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routers = require('./routes')

const app = express()
const port = 3000

//Include mongoose
require('./config/mongoose')

//Set body parser
app.use(bodyParser.urlencoded({ extended: true }))

//Set express template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//Set express static data route
app.use(express.static('public'))

//Set method override
app.use(methodOverride('_method'))

//Set routing
app.use(routers)

app.listen(port, () => {
  console.log(`Start and listen on localhost:${port}/`)
})
