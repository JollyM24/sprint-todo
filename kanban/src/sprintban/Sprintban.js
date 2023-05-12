import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './Sprintban.css'
import Column from './Components/Kanban/Column'
import TaskInfo from './Components/Popup/TaskInfo'

const taskStatuses = [
  {id: 1, name: 'Выполнить'}, 
  {id: 2, name: 'В процессе'}, 
  {id: 3, name: 'На проверке'}, 
  {id: 4, name: 'Завершено'}
];

function Sprintban() {
  const [statuses, setStatuses] = useState(taskStatuses);
  const [sprint, setSprint] = useState(null)
  const [tasks, setTasks] = useState(null);

  // for taskInfo
  const [showTaskInfo, setShowTaskInfo] = useState(null);
  const [task, setTask] = useState(null);

  const [types, setTypes] = useState(null);

  // get all tasks from database and set on tasks
  const getData = async () => {
    try {
      const res = await fetch('http://localhost:8000/project/currentSprint')
      if (res.status === 200) {
        const initSprint = await res.json()
        setSprint(initSprint)
      }

      const response = await fetch('http://localhost:8000/tasks')
      if (response.status === 200) {
        const nitTasks = await response.json()
        setTasks(nitTasks)
      }

      const typesRes = await fetch('http://localhost:8000/types')
      if (typesRes.status === 200) {
        const initTypes = await typesRes.json()
        setTypes(initTypes)
      }
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => getData, [])

  // set new task status
  const editData = async (taskId, task_status) => {
    try {
      const response = await fetch(`http://localhost:8000/tasks/edit_status/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({task_status}),
      })
      if (response.status === 200) {
        setTimeout(() => getData(), 500)
      }
    } catch (err) {
      console.error(err)
    }
  }

  // edit task status on next
  const changeStatusNext = (taskId, statusId) => {
    setTasks(tasks.map(task => {
      if(task.id === taskId) {
        if(statusId !== statuses.length) {
          editData(taskId, statusId + 1);
        }
      }
      return task;
    }))
  }

  // edit task status on previous
  const changeStatusPrev = (taskId, statusId) => {
    setTasks(tasks.map(task => {
      if(task.id === taskId) {
        if(statusId !== 1) {
          editData(taskId, statusId - 1);
        }
       }
      return task;
    }))
  }

  return (
    <div className="Sprintban">
      {showTaskInfo && <TaskInfo setShowTaskInfo={setShowTaskInfo} task={task} getData={getData}/>}
    
      <div className="header">
        <h1>{sprint} спринт</h1>
        <div className="header-button">
          <button><Link to='/metrics' style={{ textDecoration: 'none' }}>Метрики</Link></button>
          <button><Link to='/project' style={{ textDecoration: 'none' }}>О проекте</Link></button>
        </div>
      </div>

      <div className="kanban-field">
        <div className="types-color-legend">
          { types?.map(t => (
            <div className="type-box" key={t.id}> 
              <div className="marker" style={{backgroundColor: t.colorcode}}></div>
              <div className="type-name">{t.name}</div> 
            </div>
          ))}
        </div>

        <div className="row" style={{width: '100%'}}>
          
          {statuses.map((status) => (
            <Column
              key={status.id} 
              status={status} 
              tasks={tasks} 
              types={types}
              setTask={setTask}
              setShowTaskInfo = {setShowTaskInfo} 
              changeStatusNext={changeStatusNext}
              changeStatusPrev={changeStatusPrev}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sprintban;