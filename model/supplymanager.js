const mongoose = require("mongoose");

const supplyManagerDMESchema = new mongoose.Schema({
  durableMedicalEquipment: {
    bedsideCommode: { type: Boolean, default: false, default: false },
    cane: { type: Boolean, default: false, default: false },
    elevatedToiletSeat: { type: Boolean, default: false, default: false },
    grabBars: { type: Boolean, default: false, default: false },
    hospitalBed: { type: Boolean, default: false, default: false },
    nebulizer: { type: Boolean, default: false, default: false },
    oxygen: { type: Boolean, default: false, default: false },
    tubShowerBench: { type: Boolean, default: false, default: false },
    walker: { type: Boolean, default: false, default: false },
    wheelchair: { type: Boolean, default: false, default: false },
    other: { type: Boolean, default: false, default: false },
  },
  durableMedicalEquipmentProvider: {
    name: { type: String, maxlength: 255 }, // Name of the provider
    phone: { type: String, maxlength: 50 }, // Phone number of the provider
    suppliesProvided: { type: String, maxlength: 1000 }, // DME/Supplies provided
  },
  comments: {
    type: String, // Additional comments
    maxlength: 5000, // Matches the form limit
  },
});

module.exports = mongoose.model("SupplyManagerDME", supplyManagerDMESchema);
