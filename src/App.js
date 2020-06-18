import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

    useEffect(() => {
        api.get('repositories').then(response => {
          setRepositories(response.data);            
        });
    }, []);

  async function handleAddRepository() {
    const repository = {
      id: Date.now(), 
      title: `Novo repositório ${Date.now()}`,
      url: 'https://github.com/rlovatto/reactjs-concepts-challenge',
      techs: ["React","JavaScript","NodeJS"],
      likes: 0
    };

    const response = await api.post('repositories',repository);
    const newRepository = response.data;
    
    setRepositories([...repositories,newRepository]);
  }

  async function handleRemoveRepository(id) {
     const repos = repositories.filter(repository => repository.id !== id);
     setRepositories([...repos]);
  }

  return (
    <div>
      <ul data-testid="repository-list">

          { repositories.map(repository => {
              return <li key={repository.id}>{repository.title}
                      <button onClick={() => handleRemoveRepository(repository.id)}>
                        Remover
                      </button>
                    </li>
            }
          )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  )
}

export default App;
