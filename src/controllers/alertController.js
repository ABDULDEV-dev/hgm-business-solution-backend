import Alert from "../models/Alert.js"

export const createAlert = async (req, res, next) => {
  try {
    const alert = await Alert.create(req.body)
    res.status(201).json({ success: true, alert })
  } catch (error) {
    next(error)
  }
}

export const getAlerts = async (req, res, next) => {
  try {
    const alerts = await Alert.find({ isResolved: false }).populate("productId").sort({ createdAt: -1 })
    res.status(200).json({ success: true, count: alerts.length, alerts })
  } catch (error) {
    next(error)
  }
}

export const resolveAlert = async (req, res, next) => {
  try {
    const alert = await Alert.findByIdAndUpdate(
      req.params.id,
      {
        isResolved: true,
        resolvedBy: req.user.id,
        resolvedAt: new Date(),
      },
      { new: true },
    )
    if (!alert) {
      return res.status(404).json({ message: "Alert not found" })
    }
    res.status(200).json({ success: true, alert })
  } catch (error) {
    next(error)
  }
}
