const {sequelize, Model, DataTypes } = require('../db')

class Task extends Model{}

Task.init({
  title: DataTypes.INTEGER,
  completed: DataTypes.STRING
},
  {
    sequelize: sequelize,
    modelName: "tasks"
  })

module.exports = {
  Task
}
