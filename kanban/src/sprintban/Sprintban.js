import { useState, useEffect } from 'react';
import './Sprintban.css'
import Column from './Components/Kanban/Column'
import Header from './Header/Header'
import TaskInfo from './Components/Popup/TaskInfo'

const taskStatuses = [
  {id: 1, name: 'Выполнить'}, 
  {id: 2, name: 'В процессе'}, 
  {id: 3, name: 'На проверке'}, 
  {id: 4, name: 'Завершено'}
];

function Sprintban() {
  const [statuses, setStatuses] = useState(taskStatuses);
  const [tasks, setTasks] = useState(null);

  // for taskInfo
  const [showTaskInfo, setShowTaskInfo] = useState(null);
  const [task, setTask] = useState(null);

  // get all tasks from database and set on tasks
  const getData = async () => {
    try {
      const response = await fetch('http://localhost:8000/tasks')
      if (response.status === 200) {
        const nitTasks = await response.json()
        setTasks(nitTasks)
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
    
      <Header />
      <div className="row">
        
        {statuses.map((status) => (
          <Column
            key={status.id} 
            status={status} 
            tasks={tasks} 
            setTask={setTask}
            setShowTaskInfo = {setShowTaskInfo} 
            changeStatusNext={changeStatusNext}
            changeStatusPrev={changeStatusPrev}
          />
        ))}
      </div>
    </div>
  );
}

export default Sprintban;