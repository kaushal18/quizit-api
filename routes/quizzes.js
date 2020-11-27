const { Quiz, validate } = require("../models/quiz");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const quizzes = await Quiz.find();
  res.send(quizzes);
});

// router.get("/:id", async (req, res) => {
//   const quiz = await Quiz.findById(req.params.id);

//   if (!quiz) res.status(404).send("quiz with given id does not exist");
//   res.send(quiz);
// });

// teacher makes a new quiz
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let quiz = new Quiz({
    subject: req.body.subject,
    description: req.body.description,
    startDateTime: req.body.startDateTime,
    endDateTime: req.body.endDateTime,
    creator: req.body.creator,
    enrolledStudents: req.body.enrolledStudents,
    questions: req.body.questions,
  });
  quiz = await quiz.save();

  res.send(quiz);
});

// router.put("/:id", async (req, res) => {
//   // validate genre then update
//   const { error } = validate(req.body);
//   if (error) return res.status(400).send(error.details[0].message);

//   const genre = await Genre.findByIdAndUpdate(
//     req.params.id,
//     { name: req.body.name },
//     { new: true }
//   );

//   if (!genre) res.status(404).send("genre with given id does not exist");

//   res.send(genre);
// });

// router.delete("/:id", async (req, res) => {
//   const genre = await Genre.findByIdAndRemove(req.params.id);

//   if (!genre) res.status(404).send("genre with given id does not exist");

//   res.send(genre);
// });

module.exports = router;
