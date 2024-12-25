const mongoose = require("mongoose");

const genderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    //enum: ["male", "female", "other"],
  },
});

const Gender = mongoose.model("Gender", genderSchema);

module.exports = Gender;


