require("dotenv").config();
const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const memeRoutes = require("./routes/memes");
const { setupBidHandlers } = require("./sockets/bidHandlers");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
	cors: {
		origin: process.env.CLIENT_URL || "http://localhost:5173",
		methods: ["GET", "POST"],
	},
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/memes", memeRoutes);

// Socket.IO setup
io.on("connection", (socket) => {
	console.log("Client connected:", socket.id);

	setupBidHandlers(io, socket);

	socket.on("disconnect", () => {
		console.log("Client disconnected:", socket.id);
	});
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
	console.log(`🚀 Server running on port ${PORT}`);
});
