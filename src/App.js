import React from "react";
import api from "./services/api"; //importando API

import "./styles.css";

// importando separadamente o método useState()
import { useState, useEffect } from "react";

function App() {
  // criando um vetor que respeita a Imutabilidade
  // será a estrutura que vai conter as informações do programa
  // id (uuid), title, url, techs, likes
  const [repositories, setRepositories] = useState([]); // vetor de objetos?

  // pegando os repositórios que já existem, só irá acontecer uma vez
  useEffect(() => {
    api.get("repositories").then((response) => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    // chamando o método post do backend
    const response = await api.post("repositories", {
      // body com as informações
      title: "Repositório",
      url: "http://github.com/CloudAlb",
      techs: ["ReactJS"]
    });

    // atualizando o vetor
    const repository = response.data;
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    // chamando o método delete do backend
    // não preciso ver o retorno de delete, pois ele não retorna nada mesmo
    await api.delete(`repositories/${id}`);

    // atualizando o vetor
    setRepositories(repositories.filter((repository) => repository.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            Repositório: {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
