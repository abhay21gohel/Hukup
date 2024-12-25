const express = require("express");
const {getGenders} = require("../controllers/gender");

const router = express.Router();
router.get("/", getGenders);

module.exports = router;
