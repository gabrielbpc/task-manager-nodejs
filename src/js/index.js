const express = require('express')
const app = express()
const tasks = []

app.use(express.json())

app.get('/tasks', (req, res) => res.json(tasks))

app.post('/tasks', (req, res) => {
  const { id, name, subTasks = [] } = req.body

  const newTask = {
    id,
    name,
    subTasks
  }

  tasks.push(newTask)

  res.json(tasks)
})

app.put('/tasks/:id', (req, res) => {
  const { id } = req.params
  const { name, subTasks = [] } = req.body

  const task = tasks.find(task => task.id === Number(id))

  task.name = name
  task.subTasks = subTasks

  res.json(tasks)
})

app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params

  const taskIndex = tasks.findIndex(p => p.id === id)

  tasks.splice(taskIndex, 1)

  return res.send()
})

app.listen(5000, () => console.log('server running!'))
