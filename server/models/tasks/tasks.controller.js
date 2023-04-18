const pool = require('../../db')

class TasksController {
    // get all tasks of current sprint
    async getCurrentTasks(req, res) {
        const tasks = await pool.query('SELECT * FROM tasks WHERE tasks.sprint = (SELECT sprints FROM project)')
        res.json(tasks.rows)
    }

    // get task by id
    async getTask(req, res) {
        const { id } = req.params
        try {
            const task = await pool.query(`SELECT * FROM tasks WHERE id = $1`, [ id ])
            res.json(task.rows)
            console.log(`task with id = ${ id } find`)
        } catch (err) {
            console.error(err)
        }
    }

    // edit a task status
    async updateTaskStatus(req,res) {
        const { id } = req.params
        const { task_status } = req.body
        try {
            const editTask = await pool.query(`UPDATE tasks SET task_status = $1 WHERE id = $2 RETURNING *`, [ task_status, id])
            res.json(editTask.rows)
            console.log('update success')
        } catch (err) {
            console.error(err)
        }
    }

    //edit a task
    async updateTask(req,res) {
        const { id } = req.params
        const { title, descr, priority } = req.body
        try {
            const editTask = await pool.query(`UPDATE tasks SET title = $1, descr = $2, priority = $3 WHERE id = $4 RETURNING *`, [ title, descr, priority, id])
            res.json(editTask.rows)
            console.log('update success')
        } catch (err) {
            console.error(err)
        }
    }
}

module.exports = new TasksController()