var express = require('express')
var router = express.Router()
var ProductModel = require('../models/productModel.js');

const db = require('../DB/mongoose.js')

async function getAllProducts(req, res,next) {
    try {
        const products = await ProductModel.find()
        res.send({ success: true, message: products })
    } catch (error) {
        next(error)
    }
}

async function postProduct(req, res,next) {
    try {
        const data = req.body
        //const{name,categoryId,description,price,imageURL}=req.body
        const inserted = await ProductModel.create(data)
        res.send({ success: true, message: data })
    } catch (error) {
        next(error)
    }
}

async function getByCategoryId(req, res,next) {
    try {
        const categories = req.query.categoryId;
        // const categories = req.params.categoryId;
        //const products=await ProductModel.find({categoryId: categories})
        const products = await ProductModel.find({ categoryId: { $in: categories } })
        res.send({ success: true, message: products })
    } catch (error) {
       next(error)
    }
}
//async function getByArrayCategory(req,res){}

module.exports = { getAllProducts, postProduct, getByCategoryId }//getByArrayCategory,

