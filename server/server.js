const PORT = process.env.PORT ?? 8000
const express = require('express')
const cors = require('cors')
const app = express()
const pool = require('./db')

const projectRouter = require('./models/project/project.routes')
const tasksRouter = require('./models/tasks/tasks.routes')
const sprintsRouter = require('./models/sprints/sprints.routes')
const scoreRouter = require('./models/score/score.routes')
app.use(cors())
app.use(express.json())

app.use('/project', projectRouter)
app.use('/tasks', tasksRouter)
app.use('/sprints', sprintsRouter)
app.use('/score', scoreRouter)

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))