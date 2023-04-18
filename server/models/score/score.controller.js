const pool = require('../../db')

class ScoreController {
    // get all scores of current sprint
    async getScores(req, res) {
        const scores = await pool.query('SELECT *, TO_CHAR(ddate, \'DD/MM/YYYY\') as ddate FROM score WHERE score.sprint_id = (SELECT sprints FROM project) ORDER BY score.id;')
        res.json(scores.rows)
    }

    async getDdates(req, res) {
        const score_dates = await pool.query('SELECT TO_CHAR(ddate, \'DD/MM/YYYY\') as ddate FROM score WHERE score.sprint_id = (SELECT sprints FROM project) ORDER BY score.id;')
        const date_array = score_dates.rows.map(a=> a.ddate)
        res.json(date_array)
    }

    async getDone(req, res) {
        const done_task = await pool.query('SELECT done FROM score WHERE score.sprint_id = (SELECT sprints FROM project) ORDER BY score.id;')
        const done_array = done_task.rows.map(a => a.done)
        res.json(done_array)
    }

}

module.exports = new ScoreController()