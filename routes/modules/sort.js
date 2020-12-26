const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

//Implement sorting
router.get('/:method', (req, res) => {
  const methodDescription = req.params.method.split('_')[0]
  const method = req.params.method.split('_')[1]

  return Restaurant.find()
    .lean()
    .sort(method)
    .then((restaurants) =>
      res.render('index', {
        restaurants,
        methodDescription,
      })
    )
    .catch((error) => console.log(error))
})

module.exports = router
