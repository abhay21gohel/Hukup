require("dotenv").config();
const USER = require("../models/user");
const OTP = require("../models/otp");
const asyncHandler = require("express-async-handler");
const generateOtp = require("../config/generateOtp");
const generateToken = require("../config/generateToken");
const jwt = require("jsonwebtoken");

// verification and authorization

const sendOtp = asyncHandler(async (req, res) => {
  const phoneNumber = req.body.phoneNumber;
  const countryCode = req.body.countryCode;

  if (!phoneNumber || !countryCode) {
    res.status(400).json({
      message: "Please enter phone number and country code",
      success: false,
    });
  }

  const otp = generateOtp();
  const createdOtp = await OTP.create({
    countryCode,
    phoneNumber,
    otp,
    createdAt: Date.now(),
    expiredIn: Date.now() + 5 * 60 * 1000,
  });

  if (createdOtp) {
    console.log(otp);

    res.status(201).json({
      message: `Otp sent to +${countryCode} ${phoneNumber}`,
      success: true,
    });
  } else {
    res.status(500).json({
      message: `Can not send Otp`,
      success: false,
    });
  }
});

const verifyOtp = asyncHandler(async (req, res) => {
  const phoneNumber = req.body.phoneNumber;
  const countryCode = req.body.countryCode;

  const enteredOtp = req.body.otp;

  if (!enteredOtp) {
    res.status(400).json({
      message: `Please enter Otp`,
      success: false,
    });
  }
  if (enteredOtp.length != 6) {
    res.status(400).json({
      message: `Otp should be of 6 digits`,
      success: false,
    });
  }

  const user = await USER.findOne({ phoneNumber, countryCode });

  const Otp = await OTP.find({ phoneNumber, countryCode }).sort({
    createdAt: -1,
  });

  const expiredTime = new Date(Otp[0]?.expiredIn).getTime();

  if ((await Otp[0]?.matchOtp(enteredOtp)) && expiredTime >= Date.now()) {
    await OTP.deleteMany({ phoneNumber, countryCode });
    if (user) {
      res.status(200).json({
        message: "Otp verified",
        success: true,
        data: { ...user?.toObject(), token: generateToken(user._id) },
      });
    } else {
      try {
        const createUser = await USER.create({ phoneNumber, countryCode });
        res.status(200).json({
          message: "Otp verified",
          success: true,
          data: { ...createUser.toObject() },
        });
      } catch (error) {
        res.status(500).json({
          message: "Internal error",
          success: false,
          data: error,
        });
      }
    }
  } else {
    res.status(400).json({
      message: "Wrong Otp",
      success: false,
      
    });
  }
});

const authenticateUser = asyncHandler(async (req, res) => {
  const { token } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    let data = await USER.findById(decoded.id);
    if (data) {
      res.status(200).json({
        message: "User authenticated",
        data: {
          ...data.toObject(),
          token: generateToken(decoded.id),
        },
        success: true,
      });
    } else {
      res
        .status(400)
        .json({ message: "User not found", data: null, success: false });
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: "Session expired", data: error, success: false });
  }
});

// crud of user

const createPartialUser = asyncHandler(async (req, res) => {
  let { phoneNumber, countryCode, username, name, longitude, latitude, dob } =
    req.body;

  if (
    !phoneNumber ||
    !countryCode ||
    !username ||
    !name ||
    !longitude ||
    !dob ||
    !latitude
  ) {
    return res.status(400).json({
      message: "Please fill required details",
      success: false,
    });
  }

  try {
    const existingUser = await USER.findOneAndUpdate(
      {
        phoneNumber,
        countryCode,
      },
      { $set: { username, name, longitude, dob, latitude } },
      { new: true }
    );

    if (!existingUser) {
      return res.status(400).json({
        message: "Please verify your mobile number",
        success: false,
      });
    }

    res.status(201).json({
      message: "User's details are saved",
      success: true,
      data: { ...existingUser.toObject() },
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error. Please try again later.",
      success: false,
      error:error
    });
  }
});

const createCompleteUser = asyncHandler(async (req, res) => {
  let { phoneNumber, countryCode, interests, ...details } = req.body;
  interests = JSON.parse(interests);

  // Validate the required fields
  if (!phoneNumber || !countryCode || interests.length == 0) {
    return res.status(400).json({
      message: "Please fill required details",
      success: false,
    });
  }

  try {
    const existingUser = await USER.findOne({ phoneNumber, countryCode });

    if (!existingUser) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    const requiredFields = [
      "name",
      "username",
      "dob",
      "longitude",
      "latitude",
      "gender",
    ];
    for (const field of requiredFields) {
      if (!details[field] && !existingUser[field]) {
        return res.status(400).json({
          message: `Field "${field}" is required to complete the profile.`,
          success: false,
        });
      }
    }

    // Create a new user
    const user = await USER.findOneAndUpdate(
      { phoneNumber, countryCode },
      { $set: { ...details, isComplete: true, interests } },
      { new: true }
    );

    const token = generateToken(user._id);

    res.status(201).json({
      message: "User created successfully",
      success: true,
      data: { ...user.toObject(), token },
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error. Please try again later.",
      success: false,
    });
  }
});

module.exports = {
  sendOtp,
  verifyOtp,
  authenticateUser,
  createPartialUser,
  createCompleteUser,
};
