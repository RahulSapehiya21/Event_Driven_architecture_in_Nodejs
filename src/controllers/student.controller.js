/**
 * Thin controller
 * No business logic
 */
const studentService = require("../services/student.service");

exports.addStudent = async (req, res) => {
  try {
    const student = await studentService.addStudent(req.body);
    res.status(201).json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.listStudents = async (req, res) => {
  try {
    const students = await studentService.listStudents();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
