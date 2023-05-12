const pool = require('../../db')

class SprintsController {
    // get all sprints
    async getSprints(req, res) {
        //const sprints = await pool.query('SELECT *, TO_CHAR(start_date, \'DD/MM/YYYY\') as start_date, TO_CHAR(end_date, \'DD/MM/YYYY\') as end_date FROM sprints WHERE start_date::date = \'2023-04-10\';')
        const sprints = await pool.query('SELECT *, TO_CHAR(start_date, \'DD/MM/YYYY\') as start_date, TO_CHAR(end_date, \'DD/MM/YYYY\') as end_date FROM sprints;')
        res.json(sprints.rows)
    }

    // get sprints task count
    async getTaskCount(req, res) {
        const count = await pool.query('SELECT task_count FROM sprints WHERE sprints.id = (SELECT sprints FROM project);')
        res.json(count.rows[0].task_count)
    }
}

module.exports = new SprintsController()