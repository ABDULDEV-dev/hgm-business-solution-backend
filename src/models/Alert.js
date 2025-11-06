import mongoose from "mongoose"

const alertSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["low-stock", "expiry-warning", "overstock", "custom"],
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    severity: {
      type: String,
      enum: ["low", "medium", "high", "critical"],
      default: "medium",
    },
    isResolved: {
      type: Boolean,
      default: false,
    },
    resolvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    resolvedAt: {
      type: Date,
    },
  },
  { timestamps: true },
)

export default mongoose.model("Alert", alertSchema)
