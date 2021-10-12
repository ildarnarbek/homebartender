require('dotenv').config()

const express = require('express');
const sequelize = require('./db');
const models = require('./models/models');
const cors = require('cors');
const router = require('./routes/index')

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors())
app.use(express.json())
app.use('/api',router)

app.get('/', (req, res) => {
  res.status(200).json({message: 'its work!'})
})

const start = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync({ force: true }).then(()=> {
      models.DrinkGroup.create({name: "vodka"})
      models.DrinkGroup.create({name: "brandy"})
      models.DrinkGroup.create({name: "whiskey"})
      models.DrinkGroup.create({name: "vermouth"})
      models.DrinkGroup.create({name: "rum"})
      models.DrinkGroup.create({name: "gin"})
      models.DrinkGroup.create({name: "wine"})
      models.DrinkGroup.create({name: "tequila"})
      models.DrinkGroup.create({name: "absinthe"})
      models.DrinkGroup.create({name: "liquor"})
      models.DrinkGroup.create({name: "juice"})
      models.DrinkGroup.create({name: "soda"})
      models.DrinkGroup.create({name: "syrup"})
      models.DrinkGroup.create({name: "cream"})


      models.DrinkType.create({name: "classic vodka"})
      models.DrinkType.create({name: "citrus vodka"})
      models.DrinkType.create({name: "brandy"})
      models.DrinkType.create({name: "irish whiskey"})
      models.DrinkType.create({name: "bourbon whiskey"})
      models.DrinkType.create({name: "scotch whiskey"})
      models.DrinkType.create({name: "dry vermouth"})
      models.DrinkType.create({name: "bianco vermouth"})
      models.DrinkType.create({name: "rosso vermouth"})
      models.DrinkType.create({name: "rose vermouth"})
      models.DrinkType.create({name: "white rum"})
      models.DrinkType.create({name: "black rum"})
      models.DrinkType.create({name: "gold rum"})
      models.DrinkType.create({name: "gin"})
      models.DrinkType.create({name: "red wine"})
      models.DrinkType.create({name: "white wine"})
      models.DrinkType.create({name: "sparkling wine"})
      models.DrinkType.create({name: "rose wine"})
      models.DrinkType.create({name: "silver tequila"})
      models.DrinkType.create({name: "gold tequila"})
      models.DrinkType.create({name: "absinthe"})
      models.DrinkType.create({name: "triple sec liquor"})
      models.DrinkType.create({name: "blue curacao liquor"})
      models.DrinkType.create({name: "coffee liquor"})
      models.DrinkType.create({name: "limon liquor"})
      models.DrinkType.create({name: "jagermeister liquor"})
      models.DrinkType.create({name: "campari liquor"})
      models.DrinkType.create({name: "sambuka liquor"})
      models.DrinkType.create({name: "mint liquor"})
      models.DrinkType.create({name: "cream liquor"})
      models.DrinkType.create({name: "coconut liquor"})
      models.DrinkType.create({name: "amareto liquor"})
      models.DrinkType.create({name: "cherry liquor"})
      models.DrinkType.create({name: "berry liquor"})
      models.DrinkType.create({name: "orange juice"})
      models.DrinkType.create({name: "grapefruit juice"})
      models.DrinkType.create({name: "lime juice"})
      models.DrinkType.create({name: "limon juice"})
      models.DrinkType.create({name: "apple juice"})
      models.DrinkType.create({name: "cherry juice"})
      models.DrinkType.create({name: "pineapple juice"})
      models.DrinkType.create({name: "cranberry juice"})
      models.DrinkType.create({name: "blueberry juice"})
      models.DrinkType.create({name: "juice"})
      models.DrinkType.create({name: "juice"})
      models.DrinkType.create({name: "soda"})
      models.DrinkType.create({name: "blue curacao syrup"})
      models.DrinkType.create({name: "mint syrup"})
      models.DrinkType.create({name: "cherry syrup"})
      models.DrinkType.create({name: "shugar syrup"})
      models.DrinkType.create({name: "grenadine syrup"})
      models.DrinkType.create({name: "limon syrup"})

  
      models.Sex.create({name: "male"})
      models.Sex.create({name: "female"})

      models.OrderStatus.create({name: "pending"})
      models.OrderStatus.create({name: "in process"})
      models.OrderStatus.create({name: "canceled"})
      models.OrderStatus.create({name: "done"})
  
      models.CocktailType.create({name: "shot"})
      models.CocktailType.create({name: "short"})
      models.CocktailType.create({name: "long"})


      models.Glass.create({name: "shot"})
      models.Glass.create({name: "lowball"})
      models.Glass.create({name: "highball"})
      models.Glass.create({name: "cocktail"})
      models.Glass.create({name: "hurricane"})
      models.Glass.create({name: "margarita"})

      models.Drink.create({
          name: "Столичная",
          count: 500,
          drinkGroupId: 1,
          drinkTypeId: 1,
          alcoPercent: 40
        })
      models.Drink.create({
        name: "Капитан Морган",
        count: 500,
        drinkGroupId: 5,
        drinkTypeId: 12,
        alcoPercent: 40
      })
      

    })
    // const testCocktail = await models.Cocktail.create({name: "Грейхаунд", cocktailTypeId: 2, glassId: 2})
    // const testDrink = await models.Drink.create({
    //   name: "Столичная",
    //   count: 500,
    //   drinkGroupId: 1,
    //   drinkTypeId: 1,
    //   alcoPercent: 40
    // })


    // await testCocktail.addDrink(testDrink, { through: { count: 50 }});




    app.listen(PORT, () => {console.log(`Server started on port ${PORT}`)})
  } catch (error) {
    console.log(error);
  }
}

start()