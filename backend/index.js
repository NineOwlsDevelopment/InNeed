require("dotenv").config();
require("./db/mongoose");

const express = require("express");
const app = express();
const server = require("http").createServer(app);

const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");

const WebSocket = require("ws");
const wss = new WebSocket.Server({ server });

app.use(cookieParser());
app.use(express.json());
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

// CORS Config
if (process.env.NODE_ENV === "production") {
  app.use(
    cors({
      origin: [
        process.env.PRODUCTION_URL,
        process.env.SOCKET_PRODUCTION_URL,
        process.env.CNAME_URL,
      ],
      credentials: true,
    })
  );
} else {
  app.use(
    cors({
      origin: [
        `http://localhost:3000`,
        `http://127.0.0.1:3000`,
        "ws://localhost:3000",
        "ws://127.0.0.1:3000",
      ],
      credentials: true,
      contentType: "*",
    })
  );
}

const PORT = process.env.PORT || 5000;

const user = require("./routes/user");

app.use("/api/user", user);

wss.on("connection", (ws) => {
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
