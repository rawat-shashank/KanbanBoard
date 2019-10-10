const Sequelize = require("sequelize");
const db = require("../config/database");

const Task = db.define("tasks", {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING
  },
  type: {
    type: Sequelize.ENUM,
    values: ['todo', 'inProgress', 'done']
  },
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: "users",
      key: "id"
    }
  }
});

module.exports = Task;
