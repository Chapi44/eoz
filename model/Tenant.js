const mongoose = require("mongoose");

const TenantSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  tenantId: { type: String, required: true, unique: true },
});

module.exports = mongoose.model("Tenant", TenantSchema);
