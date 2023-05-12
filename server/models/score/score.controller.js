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

    async getDoneCount(req, res) {
        var taskCount = await pool.query('SELECT task_count FROM sprints WHERE sprints.id = (SELECT sprints FROM project);');
        taskCount = taskCount.rows[0].task_count;
        
        const doneTask = await pool.query('SELECT done FROM score WHERE score.sprint_id = (SELECT sprints FROM project) ORDER BY score.id;')
        var newDonesCount = doneTask.rows.map(a => a.done)

        res.json(newDonesCount)
    }

    async getDoneTotal(req, res) {
        var taskCount = await pool.query('SELECT task_count FROM sprints WHERE sprints.id = (SELECT sprints FROM project);');
        taskCount = taskCount.rows[0].task_count;
        
        const doneTask = await pool.query('SELECT done FROM score WHERE score.sprint_id = (SELECT sprints FROM project) ORDER BY score.id;')
        var doneArray = doneTask.rows.map(a => a.done)
        var newDonesTotal = doneArray.map((a) => {
            a = taskCount - a
            taskCount = a
            return a
          })
        res.json(newDonesTotal)
    }

    async getDoneStartTotal(req, res) {
        var taskCount = await pool.query('SELECT task_count FROM sprints WHERE sprints.id = (SELECT sprints FROM project);');
        taskCount = taskCount.rows[0].task_count;
        
        const doneTask = await pool.query('SELECT done FROM score WHERE score.sprint_id = (SELECT sprints FROM project) ORDER BY score.id;')
        var doneArray = doneTask.rows.map(a => a.done)
        var newDonesTotal = doneArray.map((a) => {
            a = taskCount - a
            taskCount = a
            return a
          })

        newDonesTotal.unshift(newDonesTotal[0])
        newDonesTotal.length -= 1

        res.json(newDonesTotal)
    }

    async getPlan(req, res) {
        var taskCount = await pool.query('SELECT task_count FROM sprints WHERE sprints.id = (SELECT sprints FROM project);');
        taskCount = taskCount.rows[0].task_count;

        const doneTask = await pool.query('SELECT done FROM score WHERE score.sprint_id = (SELECT sprints FROM project) ORDER BY score.id;')
        const doneArray = doneTask.rows.map(a => a.done)

        let coef = taskCount/doneArray.length;
        
        let prePlan = []
        for(let i = 0; i < doneArray.length; i++) {
            prePlan[i] = Math.floor(taskCount - coef * i)
        }

        res.json(prePlan)
    }
}

module.exports = new ScoreController()