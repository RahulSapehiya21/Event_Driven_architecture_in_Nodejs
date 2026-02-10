// const eventBus = require("../events/eventBus");

// eventBus.on("student.created", async (payload)  => {
//     await AuditLog.create(
//         `Student created: ${payload.student.name}`
//     )
// })


/**
 * Handles audit logging
 * Completely decoupled from core flow
 */
const eventBus = require("../events/eventBus");
const { STUDENT_CREATED } = require("../events/student.events");
const AuditLog = require("../models/AuditLog");

eventBus.on(STUDENT_CREATED, async (payload) => {
  await AuditLog.create(
    `Student created: ${payload.student.name}`
  );
});
