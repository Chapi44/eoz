const Tenant = require("../models/Tenant");
const { getTenantDB } = require("../db/tenantManager");

const tenantMiddleware = async (req, res, next) => {
  try {
    const tenantId = req.headers["x-tenant-id"]; // Assume the tenant ID is passed in headers
    if (!tenantId) {
      return res.status(400).json({ error: "Tenant ID is required" });
    }

    // Check if tenant exists
    const tenant = await Tenant.findOne({ tenantId });
    if (!tenant) {
      return res.status(404).json({ error: "Tenant not found" });
    }

    // Get the specific tenant database
    req.tenantDb = await getTenantDB(tenantId);
    next();
  } catch (error) {
    console.error("Tenant Middleware Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = tenantMiddleware;
