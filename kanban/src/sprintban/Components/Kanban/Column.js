import './TasksColumn.css';
import Task from './Task';

function Column(props){
    return (
        <div className="col">

            <h3>{props.status.name}</h3>
        
            {props.types && props.tasks?.filter((task) => task.task_status === props.status.id)
                .sort((a, b) => a.type_id - b.type_id)
                .sort((a,b) => {
                    if (a.type_id === b.type_id) return a.priority - b.priority})
                .map((task) => (
                    <Task key={task.id} 
                        task={task} 
                        statusId = {props.status.id}
                        type = {props.types.find(t => (task.type_id === t.id))}
                        changeStatusNext={props.changeStatusNext} 
                        changeStatusPrev={props.changeStatusPrev} 
                        setTask={props.setTask}
                        setShowTaskInfo={props.setShowTaskInfo}
                    />
            ))}
        </div>
    )
};

export default Column;