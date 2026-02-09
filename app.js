const express = require("express");
const app = express();

app.use(express.json());

// Routes
app.use("/students", require("./routes/student.routes"));

module.exports = app;
