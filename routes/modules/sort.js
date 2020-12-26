const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

//Implement sorting
router.get('/:method_index', (req, res) => {
  const methodIndex = Number(req.params.method_index)
  const methods = [
    { name: 'asc' },
    { name: 'desc' },
    { category: 'asc' },
    { location: 'asc' },
    { rating: 'desc' },
  ]

  const methodDescriptions = ['A -> Z', 'Z -> A', '類別', '地區', '評價']

  Restaurant.find()
    .lean()
    .sort(methods[methodIndex])
    .then((restaurants) =>
      res.render('index', {
        restaurants,
        methodDescription: methodDescriptions[methodIndex],
      })
    )
    .catch((error) => console.log(error))
})

module.exports = router
