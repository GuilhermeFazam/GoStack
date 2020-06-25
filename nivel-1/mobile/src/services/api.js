import axios from "axios";

const api = axios.create({
	baseURL: "http://localhost:3333",
});

export default api;

/**
 * IOS com emulador: localhost
 * IOS com fisico: IP da maquina
 *
 * Android com Emulador: localhost - adb reverse
 * Android com Emulador: 10.0.2.2 (Android studio)
 * Android com Emulador: 10.0.3.2 (Genymotion)
 * Android com fisico: IP da maquina
 *
 */
