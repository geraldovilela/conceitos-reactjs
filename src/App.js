import React, { useEffect,useState } from "react";
import api from './services/api';
import "./styles.css";

function App() {
  const [projects, setProjects] = useState([])
  useEffect(() => {
    api.get('/repositories').then(response => {
      
     
      setProjects(response.data);
    })
    
  },[])
  

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: `Teste ${Date.now()}`,
	    url: "https://github.com/geraldovilela",
	    techs: ["Vertx","JavaEE"]
    })

    setProjects([...projects, response.data])
  }

  async function handleRemoveRepository(id) {

    
    const response = await api.delete(`/repositories/${id}`)
    const projectIndex = projects.findIndex(project => project.id == id);
    const newProjects= projects.filter(project => project.id !== id);
    setProjects(newProjects);
    

  }

  return (
    <div>
      <ul data-testid="repository-list">
        
          {projects.map(project=> <li key={project.id}> {project.title}

          <button onClick={() => handleRemoveRepository(project.id)}>
            Remover
          </button>
        </li>)}
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
