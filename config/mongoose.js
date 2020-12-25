const mongoose = require('mongoose')

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

module.exports = db
