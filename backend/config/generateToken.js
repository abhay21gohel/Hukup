const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  const expiresIn = "10d";
  return jwt.sign({ id }, process.env.JWT_KEY, { expiresIn });
};
module.exports = generateToken;
