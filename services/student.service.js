/**
 * ❌ MONOLITHIC SERVICE
 * Everything happens here synchronously
 */
const Student = require("../models/Student");
const Marks = require("../models/Marks");
const AuditLog = require("../models/AuditLog");

exports.addStudent = async ({ name, email, marks }) => {
  // 1. Save student
  const student = await Student.create({ name, email });

  // 2. Save marks
  await Marks.createMany(student.id, marks);

  // 3. Save audit log
  await AuditLog.create(`Student created: ${name}`);

  return student;
};

exports.listStudents = async () => {
  return Student.findAllWithMarks();
};
