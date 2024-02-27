const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    description: {type: String, required: true},
    company: {type: String, required: true},
    category: String,
    imageUrl: {type: String, required: true},
    image1Url: {type: String, required: true},
    image2Url: {type: String, required: true},
    image3Url: {type: String, required: true},
    admin: {type: mongoose.Schema.Types.ObjectId, ref: "Admin"}
})

const menuModel = mongoose.model("menu", productSchema);

module.exports = menuModel;