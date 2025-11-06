export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePassword = (password) => {
  return password.length >= 6
}

export const validateProductData = (data) => {
  const errors = []

  if (!data.productId || data.productId.trim() === "") {
    errors.push("Product ID is required")
  }
  if (!data.name || data.name.trim() === "") {
    errors.push("Product name is required")
  }
  if (!data.category || data.category.trim() === "") {
    errors.push("Category is required")
  }
  if (typeof data.quantity !== "number" || data.quantity < 0) {
    errors.push("Quantity must be a positive number")
  }
  if (typeof data.unitPrice !== "number" || data.unitPrice < 0) {
    errors.push("Unit price must be a positive number")
  }

  return { isValid: errors.length === 0, errors }
}
