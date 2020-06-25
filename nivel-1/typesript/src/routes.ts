import { Request, Response } from "express";
import createUser from "./services/CreateUser";

//string, number, boolean, object, Array

//interface

export function helloWorld(request: Request, response: Response) {
	const user = createUser({
		name: "Nome",
		email: "email",
		password: "2222",
		techs: ["Node", "React", { title: "Javascript", experience: 20 }],
	});

	return response.json({ message: "Hello World" });
}
