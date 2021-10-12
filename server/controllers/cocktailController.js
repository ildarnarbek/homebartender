const { Cocktail, Drink, Res } = require('../models/models');
const { model } = require("../db");

class CocktailController {
  async  create(req,res) {
    try {
      const { name, glassId, cocktailTypeId } = req.body
      const cocktail = await Cocktail.create({name, glassId, cocktailTypeId})

      const rum = await Drink.findOne({ where: {drinkGroupId: 5} })

      await cocktail.addDrink(rum, { through: { count: 40 }});
      
      return res.json(cocktail)
    } catch (error) {
      return res.json(error)
    }
  }

  async  getAll(req,res) {
    const cocktails = await Cocktail.findAll()
    return res.json(cocktails)
  }
}

module.exports = new CocktailController()