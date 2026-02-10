const express = require("express");
const app = express();

/**
 * IMPORTANT:
 * Listeners must be imported ONCE
 * so they can subscribe to events
 */
require("./listener/marks.listener");
require("./listener/audit.listener");


app.use(express.json());
// Routes
app.use("/students", require("./routes/student.routes"));

module.exports = app;
