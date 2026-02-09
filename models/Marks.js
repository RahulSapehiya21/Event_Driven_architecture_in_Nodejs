const db = require("../config/db");

/**
 * Stores all marks synchronously (monolithic)
 */
exports.createMany = async (studentId, marks) => {
  for (const m of marks) {
    await db.query(
      "INSERT INTO marks (studentId, subject, marks) VALUES (?, ?, ?)",
      [studentId, m.subject, m.marks]
    );
  }
};
