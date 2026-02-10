const express = require("express");
const router = express.Router();

const controller = require("../controllers/student.controller");

router.post("/", controller.addStudent);
router.get("/", controller.listStudents);

module.exports = router;
