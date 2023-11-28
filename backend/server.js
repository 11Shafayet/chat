const express = require("express");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

app.get("/", (req, res) => {
  res.send("Api is running");
});

app.get("/api/chat", (req, res) => {
  res.send("Chat data shows here");
});

app.get("/api/chat/:id", (req, res) => {
  res.send(req.params.id);
});

app.listen(
  process.env.PORT,
  console.log(`Server is running on port ${process.env.PORT}`)
);
