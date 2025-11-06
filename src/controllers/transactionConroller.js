import Transaction from "../models/Transaction.js"
import Product from "./models/Product.js"

export const createTransaction = async (req, res, next) => {
  try {
    const { type, productId, quantity, reason } = req.body

    const product = await Product.findById(productId)
    if (!product) {
      return res.status(404).json({ message: "Product not found" })
    }

    // Update product quantity based on transaction type
    if (type === "inbound") {
      product.quantity += quantity
    } else if (type === "outbound") {
      if (product.quantity < quantity) {
        return res.status(400).json({ message: "Insufficient stock" })
      }
      product.quantity -= quantity
    } else if (type === "adjustment") {
      product.quantity = quantity
    }

    await product.save()

    const transaction = await Transaction.create({
      ...req.body,
      userId: req.user.id,
      transactionId: `TXN-${Date.now()}`,
    })

    res.status(201).json({ success: true, transaction })
  } catch (error) {
    next(error)
  }
}

export const getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find().populate("productId").populate("userId", "name email")
    res.status(200).json({ success: true, count: transactions.length, transactions })
  } catch (error) {
    next(error)
  }
}

export const getTransactionById = async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id).populate("productId").populate("userId", "name email")
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" })
    }
    res.status(200).json({ success: true, transaction })
  } catch (error) {
    next(error)
  }
}
