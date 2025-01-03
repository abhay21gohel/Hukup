const mongoose = require("mongoose");

const interestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  icon: {
    type: String,
    default: "",
    // required: true,
  },
});

const Interest = mongoose.model("Interest", interestSchema);

module.exports = Interest;
