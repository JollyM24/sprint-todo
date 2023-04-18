const pool = require('../../db')

class ProjectController {
    async getCurrentSprint(req, res) {
        const sprint = await pool.query('SELECT sprints FROM project WHERE id = \'1\'')
        res.json(sprint.rows[0].sprints)
    }
}

module.exports = new ProjectController()