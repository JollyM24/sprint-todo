import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ProjectInfo.css';
import ProjectCard from './components/cards/ProjectCard';
import SprintCard from './components/cards/SprintCard';

function ProjectInfo() {
    const [project, setProject] = useState(null)
    const [sprints, setSprints] = useState(null)

    const getData = async () => {
        try {
            const projectRes = await fetch('http://localhost:8000/project')
            if (projectRes.status === 200) {
              const projectReq = await projectRes.json()
              setProject(projectReq)
            }
          
            const sprintsRes = await fetch('http://localhost:8000/sprints')
            if (sprintsRes.status === 200) {
                const sprintsReq = await sprintsRes.json()
                setSprints(sprintsReq)
                console.log(sprints)
            } 
        } catch (err) {
          console.error(err)
        }
      }
    
    useEffect(() => getData, [])

    return(
        <div className="projectInfo">
            <div className="header">
                <h1>О проекте</h1>
                <div className="header-button">
                    <button><Link to='/' style={{ textDecoration: 'none' }}>Активный спринт</Link></button>
                    <button><Link to='/metrics' style={{ textDecoration: 'none' }}>Метрики</Link></button>
                </div>
            </div>

            <div className="pi-container">
                {project && <ProjectCard key = {project.id} data = {project}/>}
                {sprints && sprints.map((sprint) => (
                    <SprintCard 
                        key = {sprint.id}
                        data = {sprint}
                        isDone = {sprint.id === project.sprints ? false  : true}
                    />
                ))} 
            </div> 
        </div>
    )
}

export default ProjectInfo;