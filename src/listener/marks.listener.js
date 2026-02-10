// /**
//  * Side-effect handler
//  * Runs async after response
//  */
// const eventBus = require("../events/eventBus")

// eventBus.on("student.created", async (payload) => {
//     await Marks.createMany(payload.student.id, payload.marks)
// })



/**
 * Handles marks storage
 * Runs asynchronously after event emission
 */
const eventBus = require("../events/eventBus");
const { STUDENT_CREATED } = require("../events/student.events");
const Marks = require("../models/Marks");

eventBus.on(STUDENT_CREATED, async (payload) => {
  // console.log("Listener payload:", payload);

  try {
    await Marks.createMany(payload.student.id, payload.marks);
    console.log("Marks stored for student:", payload.student.id);
  } catch (err) {
    console.error("Marks listener failed:", err.message);
  }
});
