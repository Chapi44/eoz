const mongoose = require('mongoose');

const HomeHealthAgencySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    street: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    zip: {
      type: String,
      required: true
    }
  },
  phoneNumber: {
    type: String,
    required: true,
    // match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number']
  },
  faxNumber: {
    type: String,
    required: true,
    // match: [/^\d{10}$/, 'Please enter a valid 10-digit fax number']
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

const HomeHealthAgency = mongoose.model('HomeHealthAgency', HomeHealthAgencySchema);

module.exports = HomeHealthAgency;
