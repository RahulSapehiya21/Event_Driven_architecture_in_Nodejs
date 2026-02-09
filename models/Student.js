const db = require("../config/db");

exports.create = async ({ name, email }) => {
  const [result] = await db.query(
    "INSERT INTO students (name, email) VALUES (?, ?)",
    [name, email]
  );

  return { id: result.insertId, name, email };
};

exports.findAllWithMarks = async () => {
  const [rows] = await db.query(`
    SELECT s.id, s.name, s.email, m.subject, m.marks
    FROM students s
    LEFT JOIN marks m ON s.id = m.studentId
  `);

  return rows;
};
