const Router = require('express')
const router = new Router()
const drinkController = require('../controllers/drinkController')

router.get('/all', drinkController.getAll)
router.get('/by', drinkController.getBy)
router.get('/:id', drinkController.getOne)
router.post('/', drinkController.create)




module.exports = router