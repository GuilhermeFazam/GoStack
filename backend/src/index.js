const express = require("express");
const { uuid, isUuid } = require("uuidv4");

const app = express();

app.use(express.json());

/**
 * Metodos HTTP:
 *
 * GET - Buscar informações do back-end
 * POST - Criar uma informação no back-ned
 * PUT - alterar uma informação no back-ned - Recurso por completo
 * PATCH - alterar uma informação no back-ned - Apenas dados especificos
 * DELETE - Deletar uma informaçao no back-end
 *
 */

/**
 * Tipos de Parametros:
 *
 * Query Params: Principalmente - Filtros e Paginação - const { title, owner } = request.query;
 * Route Params: Identificar recursos (Atualizar/Deletar)
 * Request Body: Conteúdo na hora de criar ou edtiar o recurso (JSON)
 *
 */

/**
 * Middleware:
 *
 * Interceptador de requisiçoes: Interromper ou alterar dados de uma requisição
 *
 */

const projects = [];

function logRequests(request, response, next) {
	const { method, url } = request;

	const logLabel = `[${method.toUpperCase()}] ${url}`;

	console.time(logLabel);

	next(); //Proximo Middleware

	console.timeEnd(logLabel);
}

function validateProjetcId(request, response, next) {
	const { id } = request.params;

	if (!isUuid(id)) {
		return response.status(400).json({ error: "Invalid Project ID" });
	}

	return next();
}

app.use(logRequests);

app.use("/projects/:id", validateProjetcId);

app.get("/projects", (request, response) => {
	const { title } = request.query;
	const results = title ? projects.filter((project) => project.title.includes(title)) : projects;
	return response.json(results);
});

app.post("/projects", (request, response) => {
	const { title, owner } = request.body;
	const project = { id: uuid(), title, owner };
	projects.push(project);
	return response.json(project);
});

app.put("/projects/:id", (request, response) => {
	const { id } = request.params;
	const { title, owner } = request.body;
	const projectIndex = projects.findIndex((project) => project.id === id);

	if (projectIndex < 0) {
		return response.status(400).json({ error: "Projetc not found." });
	}

	const project = {
		id,
		title,
		owner,
	};

	projects[projectIndex] = project;

	return response.json(project);
});

app.delete("/projects/:id", (request, response) => {
	const { id } = request.params;

	const projectIndex = projects.findIndex((project) => project.id === id);

	if (projectIndex < 0) {
		return response.status(400).json({ error: "Projetc not found." });
	}

	projects.splice(projectIndex, 1);

	return response.status(204).send();
});

app.listen(3333, () => {
	console.log("BACKEND started!");
});
