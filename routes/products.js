const express = require('express')
const router = express.Router()
const getProducts = require('../controllers/products')

router.route('/static').get(getProducts.getAllProuctsStatic)
router.route('/').get(getProducts.getAllProucts)

module.exports = router