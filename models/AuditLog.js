const db = require("../config/db");

exports.create = async (message) => {
  await db.query(
    "INSERT INTO audit_logs (message) VALUES (?)",
    [message]
  );
};
