// Include mongoose
const mongoose = require('mongoose')
const Restaurant = require('../restaurant')
const restaurantList = require('./restaurant.json')

//Set data base
mongoose.connect('mongodb://localhost/restaurant-list', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
//Get data base status
const db = mongoose.connection
//Error handle
db.on('error', () => console.log('mongodb error!!'))
//Data base connect success
db.once('open', () => {
  for (let i = 0; i < 10; i++) {
    Restaurant.create(restaurantList.results[i])
  }
  console.log('Create seed data done!')
})
