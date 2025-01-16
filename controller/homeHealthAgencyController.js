const HomeHealthAgency = require('../model/address'); // Adjust the path as needed

// Create a new Home Health Agency
const createAgency = async (req, res) => {
  try {
    const { name, address, phoneNumber, faxNumber } = req.body;

    const newAgency = new HomeHealthAgency({
      name,
      address,
      phoneNumber,
      faxNumber,
    });

    const savedAgency = await newAgency.save();
    res.status(201).json(savedAgency);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all Home Health Agencies
const getAllAgencies = async (req, res) => {
  try {
    const agencies = await HomeHealthAgency.find();
    res.status(200).json(agencies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single Home Health Agency by ID
const getAgencyById = async (req, res) => {
  try {
    const { id } = req.params;
    const agency = await HomeHealthAgency.findById(id);

    if (!agency) {
      return res.status(404).json({ message: 'Agency not found' });
    }

    res.status(200).json(agency);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a Home Health Agency by ID
const updateAgency = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedAgency = await HomeHealthAgency.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedAgency) {
      return res.status(404).json({ message: 'Agency not found' });
    }

    res.status(200).json(updatedAgency);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a Home Health Agency by ID
const deleteAgency = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedAgency = await HomeHealthAgency.findByIdAndDelete(id);

    if (!deletedAgency) {
      return res.status(404).json({ message: 'Agency not found' });
    }

    res.status(200).json({ message: 'Agency deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createAgency,
  getAllAgencies,
  getAgencyById,
  updateAgency,
  deleteAgency,
};
