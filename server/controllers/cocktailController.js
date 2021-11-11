const { Cocktail, Drink, DrinkType, Recipe } = require('../models/models');
const { model } = require("../db");

class CocktailController {
  async  create(req,res) {
    try {
      const { name, glassId, cocktailTypeId } = req.body
      const cocktail = await Cocktail.create({name, glassId, cocktailTypeId})

      const rum = await Drink.findOne({ where: {drinkGroupId: 5} })

    // Drink.belongsToMany(Cocktail, {through: Recipe })
    // Cocktail.belongsToMany(Drink, {through: Recipe })

      await cocktail.addDrink(rum, { through: { count: 40 }});
      
      return res.json(cocktail)
    } catch (error) {
      return res.json(error)
    }
  }

  async  createCocktail(req,res) {
    try {
      const { name, glassId, cocktailTypeId, components } = req.body

      

      const cocktail = await Cocktail.create({name, glassId, cocktailTypeId})

      // console.log(components);
      

      console.log('hello')

      // console.log(cocktail)
      // components = JSON.parse(components)
      console.log(components)
      if (components) {
        components.forEach(async(e) => {
          console.log(e);
          
          const type = await DrinkType.findOne({ where: {id: e.drinkTypeId} })
          // console.log(type)
  
          // await Recipe.create({
          //   cocktailId: cocktail.id,
          //   drinkTypeId: e.drinkTypeId,
          //   count: e.count
          // })
          
          await type.addCocktail(cocktail, { through: { count: e.count }})
          // await cocktail.addDrink_type(type, { through: { count: e.count }})
          // Используеться название таблицыыыы 
        });
      }





      // const rum = await Drink.findOne({ where: {drinkGroupId: 5} })

      // await cocktail.addDrink(rum, { through: { count: 40 }});
      
      return res.json(cocktail)
    } catch (error) {
      return res.json(error)
    }
  }

  async  getAll(req,res) {
    const cocktails = await Cocktail.findAll()
    return res.json(cocktails)
  }

  async  getOne(req,res) {
    const cocktails = await Cocktail.findAll()
    return res.json(cocktails)
  }
}

module.exports = new CocktailController()