export const generateTransactionId = () => {
  return `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

export const generateProductId = () => {
  return `PROD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export const calculateStockStatus = (quantity, minQuantity, maxQuantity) => {
  if (quantity <= minQuantity) return "low"
  if (quantity >= maxQuantity) return "high"
  return "normal"
}
