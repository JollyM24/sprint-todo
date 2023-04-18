const Router = require('express')
const router = new Router()
const sprintsController = require('./sprints.controller')

router.get('/', sprintsController.getSprints)
router.get('/task_count', sprintsController.getTaskCount)
// router.put('/edit_status/:id', tasksController.updateTaskStatus)
// router.put('/edit_task/:id', tasksController.updateTask)

module.exports = router