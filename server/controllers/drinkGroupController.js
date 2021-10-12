const { DrinkGroup } = require('../models/models');
const { model } = require("../db");

class DrinkGroupController {
  async  create(req,res) {
    const {name} = req.body
    const drinkGroup = await DrinkGroup.create({name})
    return res.json(drinkGroup)
  }

  async  getAll(req,res) {
    const drinkGroups = await DrinkGroup.findAll()
    return res.json(drinkGroups)
  }
}

module.exports = new DrinkGroupController()