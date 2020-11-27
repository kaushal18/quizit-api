const _ = require("lodash");
const { User, validate } = require("../models/user");
const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

// register new user
router.post("/", async (req, res) => {
  // validate user
  const { error } = validate(req.body);
  if (error) res.status(400).send(error.details[0].message);

  // check if user is already registered
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("user already registered");

  user = new User(_.pick(req.body, ["name", "email", "password", "role"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  res.send(_.pick(user, ["_id", "name", "email", "role"]));
});

module.exports = router;
