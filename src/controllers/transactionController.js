import Transaction from "../models/Transaction.js";
import Product from "../models/Product.js";
import { generateTransactionId } from "../utils/helper.js";

/**
 * Create Transaction (Inbound / Outbound)
 */
export const createTransaction = async (req, res, next) => {
  try {
    const { type, productId, quantity, reason, notes, referenceNo } = req.body;

    const qty = Number(quantity);
    if (!qty || qty <= 0) {
      return res.status(400).json({ success: false, message: "Invalid quantity" });
    }

    if (!["inbound", "outbound"].includes(type)) {
      return res.status(400).json({ success: false, message: "Invalid transaction type" });
    }

    // Find product
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    // Adjust stock
    let newQty = Number(product.quantity);

    if (type === "inbound") {
      newQty += qty;
    } else {
      if (newQty < qty) {
        return res.status(400).json({ success: false, message: "Insufficient stock" });
      }
      newQty -= qty;
    }

    // Save updated product qty
    product.quantity = newQty;
    await product.save();

    // Create transaction
    const transaction = await Transaction.create({
      transactionId: generateTransactionId(),
      type,
      productId: product.id,
      quantity: qty,
      reason: reason || null,
      notes: notes || null,
      referenceNo: referenceNo || null,
      userId: (req.user && req.user.id) || null
    });

    res.status(201).json({ success: true, transaction });
  } catch (error) {
    next(error);
  }
};

/**
 * Get all transactions
 */
export const getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.findAll({
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      success: true,
      count: transactions.length,
      transactions,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get single transaction
 */
export const getTransactionById = async (req, res, next) => {
  try {
    const transaction = await Transaction.findByPk(req.params.id);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    res.status(200).json({
      success: true,
      transaction,
    });
  } catch (error) {
    next(error);
  }
};
