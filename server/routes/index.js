const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const cocktailRouter = require('./cocktailRouter')
const cocktailTypeRouter = require('./cocktailTypeRouter')
const drinkRouter = require('./drinkRouter')
const drinkTypeRouter = require('./drinkTypeRouter')
const drinkGroupRouter = require('./drinkGroupRouter')
const glassRouter = require('./glassRouter')

router.use('/user', userRouter)
router.use('/cocktail', cocktailRouter)
router.use('/drink', drinkRouter)
router.use('/cocktail-type', cocktailTypeRouter)
router.use('/drink-type', drinkTypeRouter)
router.use('/drink-group',drinkGroupRouter)
router.use('/glass', glassRouter)


module.exports = router