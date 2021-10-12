const { Drink } = require('../models/models');
const { model } = require("../db");

class DrinkController {
  async  create(req,res) {
    try {
      const {name, count, drinkGroupId, drinkTypeId, alcoPercent} = req.body
      const drink = await Drink.create({name, count, drinkGroupId, drinkTypeId, alcoPercent})
      return res.json(drink)
    } catch (error) {
      return res.json(error)
    }

  }

  async  getAll(req,res) {
    const drinks = await Drink.findAll()
    return res.json(drinks)
  }

  async  getBy(req,res) {
    let { drinkGroupId, drinkTypeId } = req.query

    let drinks

    if (drinkGroupId && !drinkTypeId) {
      drinks = await Drink.findAll({where: {drinkGroupId}})
    }
    if (!drinkGroupId && drinkTypeId) {
      drinks = await Drink.findAll({where: {drinkTypeId}})
    }
    if (drinkGroupId && drinkTypeId) {
      drinks = await Drink.findAll({where: {drinkGroupId , drinkTypeId}})
    }
    if (!drinkGroupId && !drinkTypeId) {
      drinks = await Drink.findAll()
    }

    return res.json(drinks)
  }

  async  getOne(req,res) {
    const {id} = req.params
    const drink = await Drink.findOne({where: {id}})
    return res.json(drink)
  }
}

module.exports = new DrinkController()