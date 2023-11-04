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

// gets events
db = "src/server/database/events.json";
let current_events = JSON.parse(fs.readFileSync(db));

io.on("connection", (socket) => {
  socket.on("get_events", () => {
    socket.emit("send_events", current_events);
  })

  socket.on("event_created", (eventData) => {
    // writes events
    eventData.id = current_events.events.length;
    current_events.events.push(eventData);
    fs.writeFileSync(db, JSON.stringify(current_events, null, 2));
  });

  socket.on("delete_event", (id) => {
    current_events.events.pop(id);
    fs.writeFileSync(db, JSON.stringify(current_events, null, 2));
  })

  socket.on("file-upload", (data) => {
    console.log(data);
    fs.writeFileSync(
      path.join("src/public/images/", data.fileName),
      data.fileData
    );
  });
});