var OrderModel = require('../models/orderModel.js');
var express = require('express')
var router = express.Router()

const db = require('../DB/mongoose.js');
const orderModel = require('../models/orderModel.js');

async function getOrdersByUserId(req, res,next) {
    try {
        const userId = req.params.userId;
        const orders = await OrderModel.find({ userId: userId })
        res.send({ success: true, message: orders })
    } catch (error) {
        next(error)
    }
}

async function postOrder(req, res,next) {
    debugger;
    try{
        const data = req.body
        const inserted = await orderModel.create(data)
        res.send({ success: true, message: data })
    }catch(error){
        next(error)
    }
}
module.exports = { getOrdersByUserId, postOrder }