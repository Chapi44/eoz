const express = require("express");
const router = express.Router();
const endocrineController = require("../controller/endocrineController");

// Routes for Endocrine/Hematological Assessment
router.post("/endocrine", endocrineController.createEndocrineAssessment);
router.get(
  "/endocrine/oasis/:oasisAssessmentId",
  endocrineController.getEndocrineAssessmentByOasisId
);
router.get(
  "/endocrine/:endocrineId",
  endocrineController.getEndocrineAssessmentById
);
router.put(
  "/endocrine/oasis/:oasisAssessmentId/endo/:endocrineId",
  endocrineController.updateEndocrineAssessment
);


module.exports = router;
