const { DrinklType } = require('../models/models');
const { model } = require("../db");

class DrinkTypeController {
  async  create(req,res) {
    const {name} = req.body
    const  drinkType = await DrinklType.create({name})
    return res.json(drinkType)
  }

  async  getAll(req,res) {
    const drinklTypes = await CocktailType.findAll()
    return res.json(drinklTypes)
  }
}

module.exports = new DrinkTypeController()