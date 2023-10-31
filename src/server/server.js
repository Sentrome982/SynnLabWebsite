const express = require("express");
const multer = require("multer");
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

//Image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/public/images");
  },

  filename: (req, file, cb) => {
    console.log(file);
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
//const upload = multer({ dest: "../public/image/" });

//Image recieve
app.get("/upload", (req, res) => {
  console.log("get");
  res.sendFile(__dirname + "/public/admin/main.html");
});

app.post("/upload", upload.single("image"), async (req, res) => {
  res.send("uploaded");
});

server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

const database = "database/events.json";

io.on("connection", (socket) => {
  console.log("A user connected"); // optional\
  socket.on("event_created", (eventData) => {
    console.log(eventData);
  });
});
