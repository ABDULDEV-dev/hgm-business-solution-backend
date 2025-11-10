import Product from "../models/Product.js"

export const createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body)
    res.status(201).json({ success: true, product })
  } catch (error) {
    next(error)
  }
}

export const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.status(200).json({ success: true, count: products.length, products })
  } catch (error) {
    next(error)
  }
}

export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id)
    if (!product) {
      return res.status(404).json({ message: "Product not found" })
    }
    res.status(200).json({ success: true, product })
  } catch (error) {
    next(error)
  }
}

export const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id)
    if (!product) {
      return res.status(404).json({ message: "Product not found" })
    }
    await product.update(req.body)
    res.status(200).json({ success: true, product })
  } catch (error) {
    next(error)
  }
}

export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id)
    if (!product) {
      return res.status(404).json({ message: "Product not found" })
    }
    await product.destroy()
    res.status(200).json({ success: true, message: "Product deleted" })
  } catch (error) {
    next(error)
  }
}
