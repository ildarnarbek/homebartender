const Router = require('express')
const router = new Router()
const drinkTypeController = require('../controllers/drinkTypeController')

router.post('/', drinkTypeController.create)
router.get('/all', drinkTypeController.getAll)


module.exports = router