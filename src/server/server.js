const express = require("express");
const path = require("path");
const http = require("http");
const socketio = require("socket.io");
const fs = require("fs");

const publicPath = path.join(__dirname, "../public/");
const port = process.env.PORT || 80;
let app = express();
let server = http.createServer(app);
let io = socketio(server);

app.use(express.static(publicPath));

server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

io.on("connection", (socket) => {
  console.log("A user connected"); // optional idk
});
