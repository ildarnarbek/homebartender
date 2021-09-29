const Router = require('express')
const router = new Router()
const cocktailTypeController = require('../controllers/cocktailTypeController')

// router.get('/')
// router.post('/')

router.post('/', cocktailTypeController.create)
router.get('/all', cocktailTypeController.getAll)

module.exports = router