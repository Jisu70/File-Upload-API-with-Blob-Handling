const mongoose = require('mongoose') ;

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
    }) ;
    console.log("Connected to the database successfully")
    } catch (error) {
        console.log(error)
    }
} 

module.exports = dbConnection ;