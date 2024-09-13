const express = require('express');
const router = express.Router();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      if (file.fieldname === "pictures") {
        cb(null, 'uploads/profilepic/');
      } else if (file.fieldname === "shopImage") {
        cb(null, 'uploads/shopImage/');
      } else if (file.fieldname === "brochureImage") {
        cb(null, 'uploads/brochureImage/');
      } else {
        cb(null, 'uploads/');
      }
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });
  
  const upload = multer({ storage: storage });

const patientController = require('../controller/patientController');

// Route to register a patient
router.post('/register', upload.array('pictures', 1), patientController.registerPatient);

// Route to get all patients
router.get('/getallpatients', patientController.getAllPatients);

// Route to get a patient by ID
router.get('/:id', patientController.getPatientById);

// Route to update patient information by ID
router.put('/update/:id', upload.array('pictures', 1), patientController.updatePatientById);


router.delete('/:id', patientController.deletePatientById);

module.exports = router;
