import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Alert = sequelize.define("Alert", {
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Alert;
