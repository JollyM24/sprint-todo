const Router = require('express')
const router = new Router()
const scoreController = require('./score.controller')

router.get('/', scoreController.getScores)
router.get('/dates', scoreController.getDdates)
router.get('/dones', scoreController.getDone)
// router.put('/edit_task/:id', tasksController.updateTask)

module.exports = router