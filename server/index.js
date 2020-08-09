const express = require("express");
const http = require("http");
const socket = require("socket.io");
const session = require("express-session");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";

const app = express();
const server = http.createServer(app);
const io = socket(server);

const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

const sessionMiddleware = session({
  secret: process.env.SESSION_KEY,
  saveUninitialized: false,
  resave: false,
});

nextApp.prepare().then(() => {
  app.use(sessionMiddleware);
  app.use(express.json());

  app.get("*", (req, res) => {
    return nextHandler(req, res);
  });

  io.use((socket, next) => {
    sessionMiddleware(socket.request, socket.request.res, next);
  });
  io.on("connection", (socket) => {
    console.log("socket connected");
  });

  server.listen(process.env.PORT || 3000, () => console.log("Server started!"));
});
