import { ValidationError, UniqueConstraintError } from "sequelize";

export const errorHandler = (err, req, res, next) => {
  console.error(err);

  // Sequelize validation error (field validation)
  if (err instanceof ValidationError) {
    const messages = err.errors ? err.errors.map((e) => e.message) : [err.message];
    return res.status(400).json({
      success: false,
      message: "Validation Error",
      errors: messages,
    });
  }

  // Sequelize unique key / constraint error
  if (err instanceof UniqueConstraintError) {
    const messages = err.errors ? err.errors.map((e) => e.message) : [err.message];
    return res.status(400).json({
      success: false,
      message: "Duplicate value error",
      errors: messages,
    });
  }

  // Known HTTP-style error object pattern (if you throw { status, message })
  if (err.status && err.message) {
    return res.status(err.status).json({ success: false, message: err.message });
  }

  // Fallback generic error
  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
};
