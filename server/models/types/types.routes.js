const Router = require('express')
const router = new Router()
const typesController = require('../types/types.controller')

router.get('/', typesController.getTypes)

module.exports = router