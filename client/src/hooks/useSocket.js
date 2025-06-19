import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const SOCKET_URL =
	import.meta.env.VITE_SOCKET_URL || import.meta.env.VITE_API_URL;

export const useSocket = () => {
	const [socket, setSocket] = useState(null);

	useEffect(() => {
		const socketInstance = io(SOCKET_URL, {
			transports: ["websocket"],
			autoConnect: true,
		});

		socketInstance.on("connect", () => {
			console.log("Connected to Socket.IO server");
		});

		socketInstance.on("connect_error", (error) => {
			console.error("Socket.IO connection error:", error);
		});

		setSocket(socketInstance);

		return () => {
			socketInstance.disconnect();
		};
	}, []);

	return socket;
};
