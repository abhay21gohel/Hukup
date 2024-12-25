const dotenv = require("dotenv");
const colors = require("colors");
const express = require("express");
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middlewares/error");
const userRoutes = require("./routes/user");
const genderRoutes = require("./routes/gender");
const interestRoutes = require("./routes/interest");
const Gender = require("./models/gender");
const Interest = require("./models/interest");

// creating server
const app = express();

// dot env file configuration
dotenv.config();

// connect to database function
connectDB();

// accepting data in JSON
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello from server.");
});
app.use("/user", userRoutes);
app.use("/gender", genderRoutes);
app.use("/interest", interestRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log("Server is Started.".bgGreen);
});
