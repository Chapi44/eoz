const express = require("express");
const router = express.Router();
const {
  createSupplyManagerDME,
  updateSupplyManagerDME,
  getAllSupplyManagerDME,
  getSupplyManagerDMEById,
  deleteSupplyManagerDME,
} = require("../controller/supplyManagerDMEController");

// Create a new SupplyManagerDME entry
router.post("/", createSupplyManagerDME);

// Update an existing SupplyManagerDME entry by ID
router.put("/:id", updateSupplyManagerDME);

// Get all SupplyManagerDME entries
router.get("/", getAllSupplyManagerDME);

// Get a specific SupplyManagerDME entry by ID
router.get("/:id", getSupplyManagerDMEById);

// Delete a specific SupplyManagerDME entry by ID
router.delete("/:id", deleteSupplyManagerDME);

module.exports = router;
