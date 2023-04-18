import './TasksColumn.css';

function Task (props) {

    return (
        <div className="task">
            <div className="card mb-3" key={props.task.id}>
                        <div className="card-body" 
                            onClick={() => {
                            props.setShowTaskInfo(true);
                            props.setTask(props.task);
                            }} >
                            <h5 className="card-title">{props.task.title}</h5>
                            <p>Приоритет: {props.task.priority}</p>
                        
                        </div>
                        <div className="buttons">
                            <button onClick={() => props.changeStatusPrev(props.task.id, props.statusId)}>&#9668;</button>
                            <button onClick={() => props.changeStatusNext(props.task.id, props.statusId)}>&#9658;</button>
                        </div>
            </div>
        </div>
    )
}

export default Task;