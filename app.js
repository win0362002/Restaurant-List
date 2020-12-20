const express = require('express')
const exphbs = require('express-handlebars')
//const restaurantList = require('./models/seeds/restaurant.json')
const mongoose = require('mongoose')
const Restaurant = require('./models/restaurant')
const restaurant = require('./models/restaurant')
const app = express()
const port = 3000

//Set data base connection
mongoose.connect('mongodb://localhost/restaurant-list', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
//Get data base status
const db = mongoose.connection
//Error handle
db.on('error', () => console.log('mongodb error!!'))
//Connect success info
db.once('open', () => console.log('mongodb connected!!'))

//set express template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//set express static data route
app.use(express.static('public'))

//Set routing
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then((restaurants) => res.render('index', { restaurants }))
    .catch((error) => console.log(error))
})

//show restaurant info
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch((error) => console.log(error))
})

//implement search bar
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter(
    (restaurant) =>
      restaurant.name.toLowerCase().includes(keyword.toLowerCase()) ||
      restaurant.category.toLowerCase().includes(keyword.toLowerCase())
  )
  res.render('index', { restaurants, keyword })
})

app.listen(port, () => {
  console.log(`start and listen on http://localhost:${port}/`)
})
