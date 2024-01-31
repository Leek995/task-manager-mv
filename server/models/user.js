const {sequelize, Model, DataTypes } = require('../db')

class User extends Model {}

User.init({
  id:{
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  firstName: DataTypes.STRING,
  lastName: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING
},{
  sequelize: sequelize,
  modelName: "users"
})

module.exports = {
  User
}
