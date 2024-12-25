require("dotenv").config();
const INTEREST=require("../models/interest")
const asyncHandler = require("express-async-handler");
const getInterests = asyncHandler(async (req, res) => {
     try {
       const interests = await INTEREST.find({}); // Fetch all interests
       res.status(200).json({
         success: true,
         data: interests,
       });
     } catch (error) {
       res.status(500).json({
         success: false,
         message: "Failed to fetch interests",
       });
     }
});

module.exports = { getInterests };
