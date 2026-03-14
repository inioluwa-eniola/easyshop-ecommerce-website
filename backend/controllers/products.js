const productsRouter = require("express").Router()
const Product = require("../models/product")

productsRouter.get("/", async (req, res) => {
  const products = await Product.find({})
  res.status(201).json(products)
})

productsRouter.get("/:id", async(req, res) => {
  const product = await Product.findById(req.params.id)
  res.status(201).json(product)
})

productsRouter.post("/", async (req, res) => {
  const { title, price, description, images, category } = req.body
  const newProduct = new Product ({
    title, 
    price, 
    description, 
    images,
    category,
  })
  const product = await newProduct.save()
  res.status(201).json(product)
})

productsRouter.delete("/", async(req, res) => {
  const result = await Product.deleteMany({})
  return res.status(201).json({success: true, ...result})
})

module.exports = productsRouter