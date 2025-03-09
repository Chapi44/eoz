const mongoose = require("mongoose");

const connections = {}; // Store tenant-specific connections

const getTenantDB = async (tenantId) => {
  if (connections[tenantId]) {
    return connections[tenantId];
  }

  const dbURI = `${process.env.MONGO}/${tenantId}`; // Separate DB for each tenant
  const connection = await mongoose.createConnection(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  connections[tenantId] = connection;
  return connection;
};

module.exports = { getTenantDB };
