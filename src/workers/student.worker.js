/**
 * Redis Worker
 * - Runs continuously
 * - Processes events reliably
 */
const redis = require("../config/redis");
const Marks = require("../models/Marks");
const AuditLog = require("../models/AuditLog");

(async function startWorker() {
  console.log("Student worker started...");

  while (true) {
    // Block until event is available
    const event = await redis.brpop("student_events", 0);
    const data = JSON.parse(event[1]);

    if (data.type === "student.created") {
      const { student, marks } = data.payload;

      try {
        await Marks.createMany(student.id, marks);
        await AuditLog.create(`Student created: ${student.name}`);
        console.log("Processed student.created for", student.id);
      } catch (err) {
        console.error("Worker failed:", err.message);
        // In real systems → retry / DLQ
      }
    }
  }
})();
