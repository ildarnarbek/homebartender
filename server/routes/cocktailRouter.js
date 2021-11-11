const Router = require('express')
const router = new Router()
const cocktailController = require('../controllers/cocktailController')

router.post('/', cocktailController.create)
router.post('/comp', cocktailController.createCocktail)
router.get('/all', cocktailController.getAll)

module.exports = router
