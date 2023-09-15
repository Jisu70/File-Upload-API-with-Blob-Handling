const express = require('express') ;
require('dotenv').config()
const app = express() ;
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))

// Db connection 
const dbConnection = require('./utils/dbConnect') ;
dbConnection()
// Routes
const photoRoutes = require('./routes/crudRoute') ;

app.use('/api', photoRoutes)

app.listen(process.env.PORT || 3000, () => {
    console.log(`app was listening on port ${process.env.PORT}`)
})