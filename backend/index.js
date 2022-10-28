require("dotenv").config();
require("./db/mongoose");

const express = require("express");
const app = express();
const server = require("http").createServer(app);
const WebSocket = require("ws");
const wss = new WebSocket.Server({ server });

const user = require("./routes/user");

const PORT = 5000;

app.use(express.json());

app.use("/api/user", user);

wss.on("connection", (ws) => {
  console.log("New user");

  ws.on("message", (msg) => {
    msg = JSON.parse(msg);

    if (msg.endpoint === "/api/test") {
      return console.log(msg.data);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
