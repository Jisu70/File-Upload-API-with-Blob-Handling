// Dependecies
const express = require("express");
const router = express.Router();
const multer = require("multer");
// ------------------------------------> To save file in upload folder
// const path = require("path");
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads");
//   },
//   filename: (req, file, cb) => {
//     const extension = path.extname(file.originalname).toLowerCase();
//     cb(null, file.fieldname + "-" + Date.now() + extension);
//   },
// });

// const upload = multer({ storage: storage });

//---------------------------------> Without saving file into upload folder
const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

// Controller
const {
  getRoute,
  putRoute,
  postRoute,
  deleteRoute,
} = require("../controlllers/crudControllers");

router.get("/:id", getRoute);
router.post("/", upload.single("img"), postRoute);
router.put("/:id", putRoute);
router.delete("/:id", deleteRoute);

//Expoting router
module.exports = router;
