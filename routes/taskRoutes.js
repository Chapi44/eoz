const express = require('express');
const router = express.Router();
const taskController = require('../controller/taskController');
const {
    authAuthorization ,
    authMiddleware ,
  } = require("../middelware/authMiddleware");
router.post("/create", authMiddleware, taskController.createTask);
router.get("/", taskController.getAllTasks);
router.get("/tasks/patient/:patientId", taskController.getTasksByPatientId);
router.get("/tasks/nurse/:nurseId", taskController.getTasksByNurseId);
router.patch("/tasks/:id/status", taskController.updateTask);
router.get("/:id", taskController.getTaskById);
router.delete('/:id', taskController.deleteTaskById);
router.get("/tasks/nurse/:nurseId/status", taskController.getTasksstatusByNurseId);
router.patch("/tasks/:id/appointment-date",authMiddleware,  taskController.updateAppointmentDate);
router.patch("/billing/:id", taskController.updateBillingStatus);


module.exports = router;
