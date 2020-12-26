const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

//Implement search bar
router.get('/search', (req, res) => {
  const keyword = req.query.keyword
  return Restaurant.find()
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

module.exports = router
