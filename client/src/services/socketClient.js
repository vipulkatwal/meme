import { io } from "socket.io-client";

const SOCKET_URL =
	import.meta.env.VITE_SOCKET_URL ||
	import.meta.env.VITE_API_URL ||
	"https://meme-production-098a.up.railway.app";

export const socket = io(SOCKET_URL, {
	transports: ["websocket"],
	autoConnect: true,
});
