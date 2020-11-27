const { Option, validate } = require("../models/optionSchema");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const options = await Option.find();
  res.send(options);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let optionDoc = new Option({
    option: req.body.option,
  });

  optionDoc = await optionDoc.save();
  res.send(optionDoc);
});

module.exports = router;
