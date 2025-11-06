import mongoose from "mongoose"

const productSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 0,
    },
    minQuantity: {
      type: Number,
      required: true,
      default: 10,
    },
    maxQuantity: {
      type: Number,
      required: true,
      default: 100,
    },
    unitPrice: {
      type: Number,
      required: true,
    },
    supplier: {
      type: String,
    },
    expiryDate: {
      type: Date,
    },
    location: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true },
)

export default mongoose.model("Product", productSchema)
