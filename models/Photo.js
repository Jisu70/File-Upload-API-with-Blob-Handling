const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
	name: {
		type: String,
		require: true
	},
    createdAt: {
        type: Date,
        default: Date.now,
      },
    updateddAt: {
        type: Date,
        default: Date.now,
      },
      description : {
        type : String
      },
      img:{
        data: Buffer,
        contentType: String
    }
})

module.exports = mongoose.model('Photo', photoSchema);


