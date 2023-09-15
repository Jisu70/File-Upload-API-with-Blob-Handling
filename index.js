// Dependencies
const express = require('express');
require('dotenv').config();
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

// Db connection
const dbConnection = require('./utils/dbConnect');
dbConnection();

// Routes
const photoRoutes = require('./routes/crudRoute');
// api end point
app.use('/api', photoRoutes);
app.get((req, res) => {
  res.status(200).json({ message : " Hello word"})
})

app.listen(3000|| 8080, () => {
  console.log(`app was listening on port 3000`);
});