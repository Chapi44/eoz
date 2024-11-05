const express = require("express");
const {
  createHealthMetric,
  getHealthMetricById,
  getAllHealthMetrics,
  getHealthMetricsByPatientId,
  getHealthMetricsByVisitId,
  updateHealthMetric,
  deleteHealthMetric,
} = require("../controller/healthMetricsController");

const router = express.Router();

// Routes for Health Metrics
router.post("/healthMetric", createHealthMetric);
router.get("/healthMetric/:id", getHealthMetricById);
router.get("/healthMetrics", getAllHealthMetrics);
router.get("/healthMetrics/patient/:patientId", getHealthMetricsByPatientId);
router.get("/healthMetrics/visit/:visitId", getHealthMetricsByVisitId);
router.put("/healthMetric/:id", updateHealthMetric);
router.delete("/healthMetric/:id", deleteHealthMetric);

module.exports = router;
