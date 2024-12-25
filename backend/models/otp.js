const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const otpSchema = new mongoose.Schema({
  countryCode: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  expiredIn: {
    type: Date,

    required: true,
  },
});

otpSchema.methods.matchOtp = async function (enteredOtp) {
  return this.otp == enteredOtp;
};

const Otp = mongoose.model("Otp", otpSchema);

module.exports = Otp;
