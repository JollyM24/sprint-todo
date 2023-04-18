import { useState } from 'react';
import './TaskInfo.css'

function TaskInfo( { setShowTaskInfo, task, getData } ) {

    const [data, setData] = useState({
        title: task.title,
        descr: task.descr,
        task_status: task.task_status,
        priority: task.priority
    })

    // edit a task
    const editTask = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`http://localhost:8000/tasks/edit_task/${task.id}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })
            if (response.status === 200) {
                setShowTaskInfo(null)
                setTimeout(() => getData(), 500)
                }
            } catch (err) {
                console.error(err)
            }
        }

    const handleChange = (e) => {
        const { name, value } = e.target
        setData(data => ({
            ...data,
            [name] : value
        }))
    }

    return (
        <div className="overlay">
            <div className="taskInfo">
                <div className="form-title-container">
                   <h3>
                   <input 
                        required
                        placeholder="your task"
                        name="title"
                        value={data.title}
                        onChange={handleChange}
                    />
                    </h3> 
                   <button onClick={() => setShowTaskInfo(null)}>X</button>
                </div>

                <form>
                    <label>Описание</label>
                    <textarea 
                        required
                        id="descr"
                        placeholder="task descr"
                        name="descr"
                        value={data.descr}
                        onChange={handleChange}
                    />

                    <label>Приоритет</label>
                    <input 
                        required
                        type="number"
                        id="priority"
                        name="priority"
                        value={data.priority}
                        min="1"
                        onChange={handleChange}
                    />
                    <div className="submit">
                        <input id="submit" type="submit" onClick={editTask}/>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default TaskInfo;