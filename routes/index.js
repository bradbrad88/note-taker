const express = require("express");
const path = require("path");
const notesRouter = require("./notes");

const app = express();

app.use("/api/notes", notesRouter);

app.get("/notes", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../public/notes.html"));
});

module.exports = app;
