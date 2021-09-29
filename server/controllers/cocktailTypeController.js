const { CocktailType } = require('../models/models');
const { model } = require("../db");

class CocktailTypeController {
  async  create(req,res) {
    const {name} = req.body
    const cocktailType = await CocktailType.create({name})
    return res.json(cocktailType)
  }

  async  getAll(req,res) {
    res.json('alllllll')
  }

}

module.exports = new CocktailTypeController()