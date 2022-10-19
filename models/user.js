const mongoose = require("mongoose");

const Schema = mongoose.Schema
const address = new Schema({
    street: String,
    city: String,
    state: String,
    country: String
})

var validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const userSchema = new Schema({
    firstName: {
        type: String,
        minlength: 2,
        maxlength: 22
    },
    lastName: {
        type: String,
        minlength: 2,
        maxlength: 22
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        minlength: 8
    },
    address: [address]
})

userSchema.virtual("allOrders", {
    ref: 'order',
    localField: "_id",
    foreignField: "userId"
}), { virtuals: true }

userSchema.set('toJSON', { virtuals: true })
userSchema.set('toObject', { virtuals: true })
module.exports = mongoose.model('User', userSchema)




