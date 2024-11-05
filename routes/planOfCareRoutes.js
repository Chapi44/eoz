const express = require("express");
const {
  createPlanOfCare,
  getPlanOfCareById,
  getAllPlansOfCare,
  updatePlanOfCare,
  deletePlanOfCare,
  getPlansOfCareByPatientId,
  getPlansOfCareByCareManagerId,
} = require("../controller/planOfCareController");

const router = express.Router();

// Plan of Care Routes
router.post("/planOfCare", createPlanOfCare);
router.get("/planOfCare/:id", getPlanOfCareById);
router.get("/plansOfCare", getAllPlansOfCare);
router.put("/planOfCare/:id", updatePlanOfCare);
router.delete("/planOfCare/:id", deletePlanOfCare);
router.get("/plansOfCare/patient/:patientId", getPlansOfCareByPatientId);
router.get("/plansOfCare/manager/:careManagerId", getPlansOfCareByCareManagerId);

module.exports = router;
