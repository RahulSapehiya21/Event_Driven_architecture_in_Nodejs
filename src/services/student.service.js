/**
 * ❌ MONOLITHIC SERVICE
 * Everything happens here synchronously
 */
// const Student = require("../models/Student");
// const Marks = require("../models/Marks");
// const AuditLog = require("../models/AuditLog");

// exports.addStudent = async ({ name, email, marks }) => {
//   // 1. Save student
//   const student = await Student.create({ name, email });

//   // 2. Save marks
//   await Marks.createMany(student.id, marks);

//   // 3. Save audit log
//   await AuditLog.create(`Student created: ${name}`);

//   return student;
// };

// exports.listStudents = async () => {
//   return Student.findAllWithMarks();
// };


// modular monolothic + event emitter

// const Student = require("../models/Student");
// const eventBus = require("../events/eventBus");
// const { STUDENT_CREATED } = require("../events/student.events");


// exports.addStudent = async (data) => {
//   // 1. Save core entity
//   const student = await Student.create(data);

//   // 2. Emit event (async side-effects)
//   eventBus.emit(STUDENT_CREATED, {
//     student,
//     marks: data.marks
//   });

//   // 3. Return immediately
//   return student;
// };

// exports.listStudents = async () => {
//   return Student.findAllWithMarks();
// };

// modular monolithic + event emitter + redis

/**
 * PHASE 2 SERVICE
 * - Saves core data
 * - Pushes event to Redis (durable)
 */
const Student = require("../models/Student");
const redis = require("../config/redis");

exports.addStudent = async (data) => {
  // 1. Save core entity
  const student = await Student.create(data);

  // 2. Push event to Redis queue
  await redis.lpush(
    "student_events",
    JSON.stringify({
      type: "student.created",
      payload: {
        student,
        marks: data.marks
      }
    })
  );

  // 3. Return immediately
  return student;
};

exports.listStudents = async () => {
  return Student.findAllWithMarks();
};
