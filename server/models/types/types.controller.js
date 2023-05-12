const pool = require('../../db')

class TypesController {
    // get all types
    async getTypes(req, res) {
        const types = await pool.query('SELECT * FROM types ORDER BY id;')
        res.json(types.rows)
    }
}

module.exports = new TypesController()