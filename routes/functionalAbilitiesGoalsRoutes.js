const express = require("express");
const router = express.Router();
const functionalAbilitiesGoalsController = require("../controller/functionalAbilitiesGoalsController");

router.post(
  "/functional-abilities-goals",
  functionalAbilitiesGoalsController.createFunctionalAbilitiesGoals
);

router.get(
  "/functional-abilities-goals/oasis/:oasisAssessmentId",
  functionalAbilitiesGoalsController.getFunctionalAbilitiesGoalsByOasisId
);

router.put(
  "/functional-abilities-goals/:functionalId/:oasisAssessmentId",
  functionalAbilitiesGoalsController.updateFunctionalAbilitiesGoals
);




module.exports = router;
