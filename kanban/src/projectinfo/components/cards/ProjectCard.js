import '../../ProjectInfo.css';

function ProjectCard( {key, data} ) {    
    return(
        <div className="pi-card" id='projectinfo'>
                <div className="pi-card-title">
                    <p>{data.name}</p>
                </div>

                <div className="pi-card-date">
                    <p>Срок выполнениия: {data.deadline}</p>
                </div>

                <div className="pi-card-description">
                    <p>Кол-во спринтов: {data.sprints}</p>
                    <p>Описание: {data.description}</p>
                </div>
        </div>
    )
};

export default ProjectCard;