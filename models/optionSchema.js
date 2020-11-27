const mongoose = require("mongoose");
const Joi = require("joi");

const optionSchema = new mongoose.Schema({
  option: {
    type: String,
    required: true,
  },
});

const Option = mongoose.model("Option", optionSchema);

function validateOption(optionObj) {
  const schema = Joi.object({
    option: Joi.string().required(),
  });
  return schema.validate(optionObj);
}

exports.Option = Option;
exports.validate = validateOption;
exports.optionSchema = optionSchema;
