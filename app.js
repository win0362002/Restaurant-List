const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const Restaurant = require('./models/restaurant')
const bodyParser = require('body-parser')
const { urlencoded } = require('body-parser')
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

//Add new restaurant
app.get('/restaurants/new', (req, res) => res.render('new'))

app.post('/restaurants', (req, res) => {
  const name = req.body.name
  const category = req.body.category
  const location = req.body.location
  const phone = req.body.phone
  const rating = req.body.rating
  const description = req.body.description
  const image =
    'https://assets-lighthouse.s3.amazonaws.com/uploads/image/file/5632/06.jpg'

  return Restaurant.create({
    name,
    category,
    location,
    phone,
    rating,
    description,
    image,
  })
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

app.post('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  const name = req.body.name
  const category = req.body.category
  const location = req.body.location
  const phone = req.body.phone
  const rating = req.body.rating
  const description = req.body.description

  return Restaurant.findById(id)
    .then((restaurant) => {
      restaurant.name = name
      restaurant.category = category
      restaurant.location = location
      restaurant.phone = phone
      restaurant.rating = rating
      restaurant.description = description
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch((error) => console.log(error))
})

// Delete restaurant
app.post('/restaurants/:id/delete', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then((restaurant) => restaurant.remove())
    .then(res.redirect('/'))
    .catch((error) => console.log(error))
})

//Implement search bar
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
