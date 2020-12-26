const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const sort = require('./modules/sort')
const restaurants = require('./modules/restaurants')

router.use('/', home)
router.use('/sort', sort)
router.use('/restaurants', restaurants)

module.exports = router
