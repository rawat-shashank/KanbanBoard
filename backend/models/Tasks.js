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
    values: ['todo', 'inProgress', 'done'],
    defaultValue: 'todo'
  },
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: "users",
      key: "id"
    }
  },
  priority: {
    type: Sequelize.ENUM,
    values: ['high', 'medium', 'low'],
    defaultValue: 'low'
  }
});

module.exports = Task;
