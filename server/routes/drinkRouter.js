const Router = require('express')
const router = new Router()

router.get('/',(req, res) => {
  res.status(200).json({message: 'its work!'})
})

router.post('/',(req, res) => {
  res.status(200).json({message: 'its work!'})
})


module.exports = router