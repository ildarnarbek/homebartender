const { DrinkType } = require('../models/models');
const { model } = require("../db");

class DrinkTypeController {
  async  create(req,res) {
    const {name} = req.body
    const  drinkType = await DrinkType.create({name})
    return res.json(drinkType)
  }

  async  getAll(req,res) {
    const drinklTypes = await DrinkType.findAll()
    return res.json(drinklTypes)
  }
}

module.exports = new DrinkTypeController()