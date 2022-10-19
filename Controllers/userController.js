var express = require('express')
var router = express.Router()
const userModel = require('../models/user')
//const db=require('../DB/db')

// async function getAllUsers(req,res){
//    const user=await db.getConnection().collection('users').find().toArray()
//    await res.send(user)
// }

// //get + paremeter
// async function getUserById(req,res){
//    const user=await db.getConnection().collection('users').findOne().toArray()
//    res.send('hello to user '+ req.params.id)
// }

// async function postUser(req,res){
//     user = req.body;
//     const newUser=await db.getConnection().collection('users').insertOne(user)
//     res.send("hello to "+user.firstName + " "+ user.lastName)
// }

// async function putUser(req,res){
//     mail=req.params.id
//     //user=req.body;
//     //user.firstName="tovi"
//     //res.send("hello to "+user.firstName + " "+ user.lastName +" "+"after put")
//     res.send("hello from post")
// }

// async function deleteUser(req,res){
//     //let email1 = req.params.email;
//     await res.send(`function delete the id of user to delete`)
// }

const db = require('../DB/mongoose.js')

async function getAllUsers(req, res, next) {
    try {
        const users = await userModel.find()
        res.send({ success: true, message: users })
    } catch (error) {
        next(error)
    }
}

async function getUserByEmailAndPassword(req, res, next) {
    try {
        const email = req.params.email
        const password = req.params.password
        const user = await userModel.findOne({ email: email, password: password })
        res.send({ success: true, message: user })
    } catch (error) {
        next(error)
    }
}

async function postUser(req, res, next) {
    try {
        const data = req.body
        const { firstName, lastName, email } = req.body
        const inserted = await userModel.create(data)
        res.send({ success: true, message: inserted })
    }
    catch (error) {
        next(error)
    }
}

async function putUser(req, res, next) {
    try {
        const userDitailesToUpdate = req.body
        const userUpdate = await userModel.findByIdAndUpdate(req.params.id, userDitailesToUpdate, { runValidators: true })
        res.send({ success: true, message: userUpdate })
    }
    catch (error) {
        next(error)
    }
}
async function deleteUser(req, res, next) {
    try {
        const user = await userModel.findByIdAndDelete(req.params.id)
        const message = "user" + user + "succesfully delete"
        res.send({ success: true, message: message })
    } catch (error) {
        next(error)
    }
}

async function getAllOrdersByUserId(req, res, next) {
    try {
        const data = await userModel.findById(req.params.id).populate({ path: 'allOrders', select: 'date sum products userId' })
        res.send({ success: true, message: data })
    }
    catch (error) {
        next(error)
    }
}

module.exports = { getAllUsers, getUserByEmailAndPassword, getAllOrdersByUserId, postUser, putUser, deleteUser }