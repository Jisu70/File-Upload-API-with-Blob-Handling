const Photo = require("../models/Photo");
const fs = require("fs");
const path = require("path");
const mime = require("mime");

// Get route
// GET route to fetch image by ID
const getRoute = async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id);
    if (!photo) {
      return res.status(404).json({ error: "Photo not found" });
    }

    res.set("Content-Type", photo.img.contentType);
    res.send(photo.img.data);
  } catch (error) {
    console.error("Error in getRoute:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Post route
const postRoute = async (req, res) => {
  try {
    const { name, description } = req.body;
    console.log(name, description);
    if (!req.file) {
      return res.status(400).json({ error: "Image file is required" });
    }
    const fileExtension = path.extname(req.file.originalname).toLowerCase();
    const obj = {
      name,
      description,
      img: {
        data: fs.readFileSync(
          path.join(__dirname, `../uploads/${req.file.filename}`)
        ),
        contentType: mime.getType(fileExtension) || "application/octet-stream",
      },
    };
    const item = new Photo(obj);
    await item.save();
    res.status(200).json({ message: "Photo was saved successfully " });
  } catch (error) {
    console.error("Error in postRoute:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Put route
const putRoute = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!req.file) {
      return res.status(400).json({ error: "Image file is required" });
    }
    const obj = {
      name,
      description,
      img: {
        data: fs.readFileSync(
          path.join(__dirname, `../uploads/${req.file.filename}`)
        ),
        contentType: "image/png",
      },
    };
    const updatedPhoto = await Photo.findByIdAndUpdate(req.params.id, obj, {
      new: true,
    });
    if (!updatedPhoto) {
      return res.status(404).json({ error: "Photo not found" });
    }
    res.status(200).json({
      message: "Photo updated successfully!",
      updatedPhoto: updatedPhoto,
    });
  } catch (error) {
    console.error("Error in putRoute:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete route
const deleteRoute = async (req, res) => {
  try {
    const deletedPhoto = await Photo.deleteOne({ _id: req.params.id });
    if (!deletedPhoto.deletedCount) {
      return res.status(404).json({ error: "Photo not found" });
    }
    res.status(200).json({
      message: "Photo deleted successfully!",
    });
  } catch (error) {
    console.error("Error in deleteRoute:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getRoute,
  postRoute,
  putRoute,
  deleteRoute,
};
