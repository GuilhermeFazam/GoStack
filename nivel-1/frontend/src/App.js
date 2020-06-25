import React, { useState, useEffect } from "react";

import api from "./services/api";

import "./App.css";

import Header from "./components/Header";

/**
 * Componente:
 * Propriedade:
 * Estado & Imutabilidade
 */

function App() {
	const [projects, setProjects] = useState([]);

	useEffect(() => {
		api.get("projects").then((response) => {
			setProjects(response.data);
			console.log();
		});
	}, []);

	/**
	 * useState retorna um Array com 2 posições
	 *
	 * 1 - Variavel com seu valor original
	 * 2 - Função para atualizarmos esse Valor
	 *      *
	 * */

	async function handleAddProject() {
		//projects.push(`Novo Projeto ${Date.now()}`);

		//setProjects([...projects, `Novo Projeto ${Date.now()}`]);
		const response = await api.post("projects", {
			title: `Novo Projeto ${Date.now()}`,
			owner: "Guilherme",
		});

		const project = response.data;

		setProjects([...projects, project]);
	}

	return (
		<>
			<Header title="Projects" />

			<ul>
				{projects.map((project) => (
					<li key={project.id}>{project.title}</li>
				))}
			</ul>

			<button type="button" onClick={handleAddProject}>
				Adicionar Projeto
			</button>
		</>
	);
}

export default App;
