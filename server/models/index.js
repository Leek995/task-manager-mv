const {Sequelize} = require('sequelize')
const {sequelize} = require('../db')

const Task = sequelize.define("tasks", {
  title: Sequelize.STRING,
  completed: Sequelize.BOOLEAN,
})

module.exports = {
  db: sequelize,
  Task
};
