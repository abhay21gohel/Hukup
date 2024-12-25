const express = require("express");
const { getInterests } = require("../controllers/interest");

const router = express.Router();
router.get("/", getInterests);

module.exports = router;
