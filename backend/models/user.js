const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      // required: true,
    },
    username: {
      type: String,
      // required: true,
      sparse: true,
      unique: true,
    },
    location: {
      type: String,
      // required: true,
    },
    img: {
      type: String,
      default: "http://img.freepik.com/free-icon/user_318-159711.jpg",
    },
    dob: {
      type: Date,
      // required: true,
    },

    gender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Gender",
      // required: true,
    },
    about: {
      type: String,
    },
    interests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Interest",
        // required: true,
      },
    ],
    countryCode: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    isComplete: {
      type: Boolean,
      default: false,
    },
    latitude: { type: Number, default: 0 },
    longitude: { type: Number, default: 0 },
  },
  { timestamps: true }
);

UserSchema.index({ countryCode: 1, phoneNumber: 1 }, { unique: true });
const User = mongoose.model("User", UserSchema);

module.exports = User;
