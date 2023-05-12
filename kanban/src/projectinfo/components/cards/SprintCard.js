import '../../ProjectInfo.css';

function SprintCard( {key, data, isDone} ) {
    return(
        <div className="pi-card" id={isDone ? 'doneSprint' : 'currentSprint'}>
                <div className="pi-card-title">
                    <p>{data.id} спринт</p>
                    {isDone 
                        ? <p>{data.mark}/5</p>
                        : <span>(Текущий)</span>
                    }
                </div>

                <div className="pi-card-date">
                    <p>{data.start_date} - {data.end_date}</p>
                </div>

                <div className="pi-card-description">
                    <p>Описание: {data.description}</p>
                    {isDone && <p>Результаты: {data.results}</p>}
                </div>
        </div>
    )
};

export default SprintCard;