const Router = require('express')
const router = new Router()
const drinkGroupController = require('../controllers/drinkGroupController')

router.post('/', drinkGroupController.create)
router.get('/all', drinkGroupController.getAll)


module.exports = router