const Router = require('express')
const router = new Router()
const scoreController = require('./score.controller')

router.get('/', scoreController.getScores)
router.get('/dates', scoreController.getDdates)
router.get('/dones/count', scoreController.getDoneCount)
router.get('/dones/total', scoreController.getDoneTotal)
router.get('/dones/start_total', scoreController.getDoneStartTotal)
// router.put('/edit_task/:id', tasksController.updateTask)
router.get('/plan', scoreController.getPlan)

module.exports = router