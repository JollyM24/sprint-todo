const pool = require('../../db')

class ProjectController {
    async getProjectInfo(req, res) {
        const info = await pool.query('SELECT *, TO_CHAR(deadline, \'DD/MM/YYYY\') as deadline FROM project;')
        res.json(info.rows[0])
    }

    async getCurrentSprint(req, res) {
        const sprint = await pool.query('SELECT sprints FROM project WHERE id = \'1\'')
        res.json(sprint.rows[0].sprints)
    }
}

module.exports = new ProjectController()