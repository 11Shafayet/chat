const express = require("express");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

const chatData = [
  {
    name: "Shafayet",
    _id: "1111",
  },
];
app.get("/", (req, res) => {
  res.send("Api is running");
});

app.get("/api/chat", (req, res) => {
  res.send(chatData);
});

app.get("/api/chat/:id", (req, res) => {
  const singleChat = chatData.find((c) => c._id === req.params.id);
  res.send(singleChat);
});

app.listen(
  process.env.PORT,
  console.log(`Server is running on port ${process.env.PORT}`)
);
