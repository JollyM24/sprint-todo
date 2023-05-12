const Router = require('express')
const router = new Router()
const projectController = require('./project.controller')

router.get('/', projectController.getProjectInfo)
router.get('/currentSprint', projectController.getCurrentSprint)

module.exports = router