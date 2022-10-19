var express = require('express')
var app = express()
app.use(express.json())
const mongoose = require('./DB/mongoose')
const path = require('path')
//const db=require('../DB/db')
//db.connect()

const user = require('./Router/user.js')
const product = require('./Router/productRoutes.js')
const category = require('./Router/categoryRoutes')
const order = require('./Router/orderRoutes')

app.use(express.static('Static'))

app.use('/api/user', user)
app.use('/api/product', product)
app.use('/api/category', category)
app.use('/api/order', order)

app.use((error, request, response, next)=> {
  // Error handling middleware functionality
  console.log( `error ${error.message}`) // log the error
  const status = error.status || 400
  response.status(status).send({success: false, message: error.message})
})

app.use(function (req, res) {
  res.status(404)
  res.sendFile(path.join(__dirname + '/Static/PageNotFound.html'));
})

app.listen(3000, () => {
  console.log(`listening at http://localhost:${3000} `);
})
