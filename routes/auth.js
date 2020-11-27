const express = require("express");
const router = express.Router();
const Joi = require("joi");
const _ = require("lodash");
const bcrypt = require("bcrypt");

const { User } = require("../models/user");

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  return schema.validate(req);
}

// login
router.post("/", async (req, res) => {
  // validate email, password
  const { error } = validate(req.body);
  if (error) res.status(400).send(error.details[0].message);

  // check if user is registered
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password");

  // hash the entered password and check if equal
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password");

  // generate jwt by signing the payload (user data) with a private key
  const token = user.generateAuthToken();
  res.send(token);
});

module.exports = router;
