const mongoose = require("mongoose");
const Joi = require("joi");

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: {
    type: Array,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
});

const Question = mongoose.model("Question", questionSchema);

function validateQuestion(questionObj) {
  const schema = Joi.object({
    question: Joi.string().required(),
    options: Joi.array().required(),
    answer: Joi.string().required(),
  });
  return schema.validate(questionObj);
}

exports.Question = Question;
exports.validate = validateQuestion;
exports.questionSchema = questionSchema;
