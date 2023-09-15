// Model 
const Photo = require('../models/Photo')
var fs = require('fs');
var path = require('path');
var multer = require('multer');
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
 
var upload = multer({ storage: storage });

//Get route
const getRoute = async (req, res) => {
    try {
        Photo.find({})
    .then((data, err)=>{
        if(err){
            console.log(err);
        }
        res.render('imagepage',{items: data})
    })
    } catch (error) {
        
    }
}

// Post route
const postRoute = async (req, res) => {
    try {
        const {name, description, } = req.body ;
        var obj = {
            name,
            description,
            img: {
                data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
                contentType: 'image/png'
            }
        }
        Photo.create(obj)
        .then ((err, item) => {
            if (err) {
                console.log(err);
            }
            else {
                item.save();
                res.redirect('/');
            }
        });
    } catch (error) {
        
    }
}

// Put route
const putRoute = async (req, res) => {
    try {
        var obj = {
            name,
            description,
            img: {
                data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
                contentType: 'image/png'
            }
        }
    const updatedPhoto = await Photo.findByIdAndUpdate(
      req.params.id,
      obj,
      { new: true }
    );
    if (!obj) {
      return res.status(404).json({
        error: "Photo not found",
      });
    }

    res.status(200).json({
      message: "Photo updated successfully!",
      updatedPhoto: updatedPhoto,
    }); 
    } catch (error) {
        
    }
}
//Delete route
const deleteRoute = (req, res) => {
    try {
        const deletedPhoto = await Photo.deleteOne({ _id: req.params.id });
    
        if (!deletedPhoto) {
          return res.status(404).json({
            error: "Photo not found",
          });
        }
        res.status(200).json({
          message: "Photo deleted successfully!",
          deletedPhoto: deletedPhoto,
        });
      } catch (error) {
        res.status(500).json({
          error: "There was a server-side error",
        });
      }
}

module.exports = {
    getRoute, postRoute, putRoute, deleteRoute
}