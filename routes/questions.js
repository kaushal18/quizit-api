const { Question, validate } = require("../models/questionSchema");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let questionDoc = new Question({
    question: req.body.question,
    options: req.body.options,
    answer: req.body.answer,
  });

  questionDoc = await questionDoc.save();
  res.send(questionDoc);
});

module.exports = router;
