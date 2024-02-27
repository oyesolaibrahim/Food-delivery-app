const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    price: {type: Number, required: true},
    location: {type: String, required: true},
    quantity: {type: Number, required: true},
    foodDetails: { type: mongoose.Schema.Types.ObjectId, ref: "menu"},
    userDetails: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
}, {timestamps: true})



const orderModel = mongoose.model("Order", orderSchema);

module.exports = orderModel;