var express = require('express')
var CategoryModel = require('../models/categoryModel.js');
var router = express.Router()

const db = require('../DB/mongoose.js')

async function getAllCategories(req, res,next) {
    try {
        const Categories = await CategoryModel.find()
        res.send({ success: true, message: Categories })
    } catch (error) {
        //res.status(500).json({ success: false, message: error.message })
        next(error)
    }
}

async function postCategory(req, res,next) {
    try {
        const data = req.body
        const inserted = await CategoryModel.create(data)
        res.send({ success: true, message: data })
    }
    catch (error) {
       next(error)
    }
}
module.exports = { getAllCategories, postCategory }