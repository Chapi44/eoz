const mongoose = require("mongoose");

const therapyNeedSchema = new mongoose.Schema({
  therapyNeed: {
    type: Number, // Number of therapy visits indicated (total of physical, occupational, and speech-language pathology combined)
    required: true
  },
  notApplicable: {
    type: Boolean, // Whether this section is marked as "Not Applicable"
    default: false
  },
  comments: {
    type: String, // Comments field for additional details
    maxlength: 5000 // Matches the character limit in the form
  },
  ordersForDisciplineAndTreatment: {
    PT: { type: Boolean, default: false }, // Physical Therapy need
    OT: { type: Boolean, default: false }, // Occupational Therapy need
    ST: { type: Boolean, default: false }  // Speech-Language Therapy need
  }
});

module.exports = mongoose.model("TherapyNeed", therapyNeedSchema);
