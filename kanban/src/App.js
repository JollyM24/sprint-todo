import { Routes, Route } from 'react-router-dom';
import './App.css'

import Sprintban from './sprintban/Sprintban';
import ProjectInfo from './projectinfo/ProjectInfo';
import Metrics from './metrics/Metrics';

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path="/" element={<Sprintban />} />
          <Route path="/sprintban" element={<Sprintban />}/>
          <Route path="/project" element={<ProjectInfo />}/>
          <Route path="/metrics" element={<Metrics />}/>
        </Routes>
    </div>
  );
}

export default App;