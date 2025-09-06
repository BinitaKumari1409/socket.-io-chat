const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files (for client)
app.use(express.static("public"));

// Handle new socket connections
io.on("connection", (socket) => {
  console.log("a user connected");

  // Listen for chat messages
  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
    io.emit("chat message", msg); // Broadcast to everyone
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(5000, () => {
  console.log("Server running at http://localhost:5000");
});
 