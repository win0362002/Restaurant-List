// Include mongoose
const Restaurant = require('../restaurant')
const restaurantList = require('./restaurant.json')
const db = require('../../config/mongoose')

//Data base connect success
db.once('open', () => {
  for (let i = 0; i < 10; i++) {
    Restaurant.create(restaurantList.results[i])
  }
  console.log('Create seed data done!')
})
