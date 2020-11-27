const mongoose = require("mongoose");
const Joi = require("joi");

const quizSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  startDateTime: {
    type: Date,
    required: true,
  },
  endDateTime: {
    type: Date,
    required: true,
  },
  creator: {
    type: String,
    required: true,
  },
  enrolledStudents: {
    type: Array,
    required: false,
  },
  questions: {
    type: Array,
    required: true,
  },
});

const Quiz = mongoose.model("Quiz", quizSchema);

function validateQuiz(quiz) {
  const schema = Joi.object({
    subject: Joi.string().required(),
    description: Joi.string().required(),
    startDateTime: Joi.date().required(),
    endDateTime: Joi.date().required(),
    creator: Joi.string().required(),
    enrolledStudents: Joi.array(),
    questions: Joi.array().required(),
  });
  return schema.validate(quiz);
}

exports.Quiz = Quiz;
exports.validate = validateQuiz;
exports.quizSchema = quizSchema;
