const mongoose = require('mongoose');
const { Schema, model } = mongoose

const productSchema = new Schema({
  title: String,
  price: Number,
  description: String,
  images: [String],
  category: String,
})

productSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

const Product = model("Product", productSchema)
module.exports = Product