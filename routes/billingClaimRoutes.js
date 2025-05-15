const express = require("express");
const router = express.Router();
const billingClaimController = require("../controller/billingClaimController");
const { authMiddleware } = require("../middelware/authMiddleware");

// CREATE a new billing claim
router.post("/create",  authMiddleware, billingClaimController.createBillingClaim);

// GET all billing claims (with optional pagination)
router.get("/", authMiddleware, billingClaimController.getAllBillingClaims);

// GET a single billing claim by ID
router.get("/:id", billingClaimController.getBillingClaimById);

// UPDATE a billing claim by ID
router.put("/:id",  billingClaimController.updateBillingClaim);

// DELETE a billing claim by ID
router.delete("/:id", billingClaimController.deleteBillingClaim);

// Get billing claims by physicianId
router.get("/physician/:physicianId", billingClaimController.getBillingClaimsByPhysicianId);


module.exports = router;
