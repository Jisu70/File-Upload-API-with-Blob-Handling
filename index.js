// Dependencies
const express = require("express");
require("dotenv").config();
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

// Db connection
const dbConnection = require("./utils/dbConnect");

// Routes
const photoRoutes = require("./routes/crudRoute");
// api end point
app.use("/api", photoRoutes);
app.get("/", (req, res) => {
  res.status(200).json({ message: " Hello word" });
});

dbConnection();
app.listen(3000, () => {
  console.log(`app was listening on port 3000`);
});
