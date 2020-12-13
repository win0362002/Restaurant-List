const express = require('express')
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')
const app = express()
const port = 3000

//set express template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//set express static data route
app.use(express.static('public'))

//Set routing
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})

//show restaurant info
app.get('/restaurants/:id', (req, res) => {
  const restaurant = restaurantList.results.find(
    (restaurant) => req.params.id === restaurant.id.toString()
  )
  res.render('show', { restaurant })
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
