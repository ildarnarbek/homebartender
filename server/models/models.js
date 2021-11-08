const sequelize = require('../db');

const { DataTypes } = require('sequelize');

const User = sequelize.define('user', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, unique: true, allowNull: false},
  password: {type: DataTypes.STRING},
  role: {type: DataTypes.STRING, defaultValue: "GUEST"},
})

const Sex = sequelize.define('sex', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING , unique: true, allowNull: false},
}, {
  createdAt: false,
  updatedAt: false,
})

const DrinkGroup = sequelize.define('drink_group', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, unique: true, allowNull: false},
},{
  createdAt: false,
  updatedAt: false,
})

const DrinkType = sequelize.define('drink_type', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, unique: true, allowNull: false},
},{
  createdAt: false,
  updatedAt: false,
})

const Drink = sequelize.define('drink', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING , unique: true, allowNull: false},
  count: {type: DataTypes.INTEGER, allowNull: false},
  alcoPercent: {type: DataTypes.INTEGER},
  isDefault: {type: DataTypes.BOOLEAN, defaultValue: false }
})

const Recipe = sequelize.define('recipe', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  count: {type: DataTypes.INTEGER , allowNull: false},
})

const OrderStatus = sequelize.define('order_status', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING , unique: true, allowNull: false},
})

const Order = sequelize.define('order', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Glass = sequelize.define('glass', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING , unique: true, allowNull: false},
},{
  createdAt: false,
  updatedAt: false,
})

const CocktailType = sequelize.define('cocktail_type', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING , unique: true, allowNull: false},
},{
  createdAt: false,
  updatedAt: false,
})

const Cocktail = sequelize.define('cocktail', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING , unique: true, allowNull: false},
  alcoPercent: {type: DataTypes.INTEGER}
})

// котейлю дописать вкус

DrinkGroup.hasMany(Drink)
Drink.belongsTo(DrinkGroup)

DrinkType.hasMany(Drink)
Drink.belongsTo(DrinkType)

Sex.hasMany(User)
User.belongsTo(Sex)

CocktailType.hasMany(Cocktail)
Cocktail.belongsTo(CocktailType)

Glass.hasMany(Cocktail)
Cocktail.belongsTo(Glass)

OrderStatus.hasMany(Order)
Order.belongsTo(OrderStatus)

User.belongsToMany(Cocktail, {through: Order })
Cocktail.belongsToMany(User, {through: Order })

// Drink.belongsToMany(Cocktail, {through: Recipe })
// Cocktail.belongsToMany(Drink, {through: Recipe })

DrinkType.belongsToMany(Cocktail, {through: Recipe })
Cocktail.belongsToMany(DrinkType, {through: Recipe })

DrinkGroup.belongsToMany(Cocktail, {through: Recipe })
Cocktail.belongsToMany(DrinkGroup, {through: Recipe })


module.exports = { User, DrinkGroup, DrinkType , Drink, Sex, OrderStatus,Cocktail, CocktailType, Glass, Recipe};