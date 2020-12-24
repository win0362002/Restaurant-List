const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const Restaurant = require('./models/restaurant')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const app = express()
const port = 3000

//Set body parser
app.use(bodyParser.urlencoded({ extended: true }))

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

//Set express template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//Set express static data route
app.use(express.static('public'))

//Set method override
app.use(methodOverride('_method'))

//Set routing
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then((restaurants) => res.render('index', { restaurants }))
    .catch((error) => console.log(error))
})

//Add new restaurant
app.get('/restaurants/new', (req, res) => res.render('new'))

app.post('/restaurants', (req, res) => {
  return Restaurant.create(req.body)
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})

//Show restaurant info
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch((error) => console.log(error))
})

//Edit restaurant info
//Show restaurant info
app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch((error) => console.log(error))
})

app.put('/restaurants/:id', (req, res) => {
  const id = req.params.id
  const {
    name,
    category,
    location,
    phone,
    rating,
    description,
    google_map,
  } = req.body

  return Restaurant.findById(id)
    .then((restaurant) => {
      restaurant.name = name
      restaurant.category = category
      restaurant.location = location
      restaurant.phone = phone
      restaurant.rating = rating
      restaurant.description = description
      restaurant.google_map = google_map
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch((error) => console.log(error))
})

// Delete restaurant
app.delete('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then((restaurant) => restaurant.remove())
    .then(res.redirect('/'))
    .catch((error) => console.log(error))
})

//Implement search bar
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  Restaurant.find()
    .lean()
    .then((restaurants) =>
      restaurants.filter(
        (restaurant) =>
          restaurant.name.toLowerCase().includes(keyword.toLowerCase()) ||
          restaurant.category.toLowerCase().includes(keyword.toLowerCase())
      )
    )
    .then((restaurants) => res.render('index', { restaurants, keyword }))
    .catch((error) => console.log(error))
})

app.listen(port, () => {
  console.log(`Start and listen on localhost:${port}/`)
})
