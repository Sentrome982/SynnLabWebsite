const express = require("express");
const path = require("path");
const http = require("http");
const socketio = require("socket.io");
const fs = require("fs");
const publicPath = path.join(__dirname, "../public/");
const port = process.env.PORT || 8080;
let app = express();
let server = http.createServer(app);
let io = socketio(server);

app.use(express.static(publicPath));

server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

const database = "database/events.json";

io.on("connection", (socket) => {
  console.log("A user connected"); // optional\
  socket.on("event_created", (eventData) => {
    console.log(eventData);
  });
  socket.on("file-upload", (data) => {
    console.log(data);
    fs.writeFileSync(
      path.join("src/public/images/", data.fileName),
      data.fileData
    );
  });
});
