const express = require('express');
const router = express.Router();
const contactController = require('../controller/contactusController');

// Routes
router.post('/contactsus', contactController.createContact);

router.get('/contactsus', contactController.getAllContacts);
router.get('/contactsus/:id', contactController.getContactById);

module.exports = router;
