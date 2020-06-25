import React, { useEffect, useState } from "react";
import { SafeAreaView, View, FlatList, ScrollView, Text, StyleSheet, StatusBar, TouchableOpacity } from "react-native";

import api from "./services/api";

/**
 *
 * Não possuem valor semântico;
 * Não possuem estilização prorpia;
 * Todos os componentes possuem por padrão display Flex;
 *
 *
 * View: Container = div, section, header, footer;
 * Text: p, span, strong, h1, h2, h3;
 *
 */

export default function App() {
	const [projects, setProjects] = useState([]);

	useEffect(() => {
		api.get("projects").then((response) => {
			console.log(response.data);
			setProjects(response.data);
		});
	}, []);

	async function handleAddProjects() {
		console.log("teste");
		const response = await api.post("projects", {
			title: "Marina EU TE AMOOOOOOO!",
			owner: "Guilherme",
		});

		console.log(response);

		const project = response.data;

		setProjects([...projects, project]);
	}

	return (
		<>
			<StatusBar barStyle="light-content" backgroundColor="#7159c1" />
			<SafeAreaView style={styles.container}>
				<FlatList data={projects} keyExtractor={(project) => project.id} renderItem={({ item: project }) => <Text style={styles.title}>{project.title}</Text>} />

				<TouchableOpacity activeOpacity={0.5} style={styles.button} onPress={handleAddProjects}>
					<Text style={styles.buttonText}>Adicionar</Text>
				</TouchableOpacity>
			</SafeAreaView>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#7159c1",
	},
	title: {
		fontSize: 20,
		color: "#fff",
		fontWeight: "bold",
	},
	button: {
		backgroundColor: "#fff",
		margin: 20,
		height: 40,
		borderRadius: 5,
		justifyContent: "center",
		alignItems: "center",
	},
	buttonText: {
		fontSize: 15,
		fontWeight: "bold",
	},
});
