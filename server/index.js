require("dotenv").config();
const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const memeRoutes = require("./routes/memes");
const { setupBidHandlers } = require("./sockets/bidHandlers");
const rateLimit = require("express-rate-limit");

const app = express();
app.set("trust proxy", 1);
const httpServer = createServer(app);
const allowedOrigins = [
	process.env.CLIENT_URL || "http://localhost:5173",
	"http://localhost:5173",
];
const io = new Server(httpServer, {
	cors: {
		origin: allowedOrigins,
		methods: ["GET", "POST"],
		credentials: true,
	},
});

// Middleware
app.use(
	cors({
		origin: allowedOrigins,
		credentials: true,
	})
);
app.use(express.json());

// Global rate limiter (100 requests per 15 minutes per IP)
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 100,
	standardHeaders: true,
	legacyHeaders: false,
});
app.use(limiter);

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

app.set("io", io);

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
	console.log(`🚀 Server running on port ${PORT}`);
});
