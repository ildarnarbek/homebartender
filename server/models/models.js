const sequelize = require('../db');

const { DataTypes } = require('sequelize');

const User = sequelize.define('user', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING},
  password: {type: DataTypes.STRING},
  role: {type: DataTypes.STRING, defaultValue: "GUEST"},
})

const DrinkGroup = sequelize.define('drink_group', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING},
})


module.exports = { User, DrinkGroup };