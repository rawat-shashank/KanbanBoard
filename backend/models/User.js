const Sequelize = require("sequelize");
const db = require("../config/database");

const User = db.define("users", {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = User;
