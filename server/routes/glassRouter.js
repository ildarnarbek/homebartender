const Router = require('express')
const router = new Router()
const GlassController = require('../controllers/glassController')

router.post('/', GlassController.create)
router.get('/all', GlassController.getAll)


module.exports = router