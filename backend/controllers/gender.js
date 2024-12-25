require("dotenv").config();
const GENDER = require("../models/gender");
const asyncHandler = require("express-async-handler");
const getGenders = asyncHandler(async (req, res) => {
  try {
    const genders = await GENDER.find({}); // Fetch all interests
    res.status(200).json({
      success: true,
      data: genders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch genders",
    });
  }
});

module.exports = { getGenders };
