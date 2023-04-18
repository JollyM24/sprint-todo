const Router = require('express')
const router = new Router()
const tasksController = require('../tasks/tasks.controller')

router.get('/', tasksController.getCurrentTasks)
router.get('/:id', tasksController.getTask)
router.put('/edit_status/:id', tasksController.updateTaskStatus)
router.put('/edit_task/:id', tasksController.updateTask)

module.exports = router