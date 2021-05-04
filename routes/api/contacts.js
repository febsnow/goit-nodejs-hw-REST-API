const express = require('express');
const router = express.Router();
const guard = require('./guard');
const validation = require('./contacts-validation-schema');
const {
  getAllContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
  updateStatusContact,
} = require('../../controllers/contacts');

router.get('/', guard, validation.queryContact, getAllContacts);

router.get('/:contactId', guard, getContactById);

router.post('/', guard, validation.addContact, addContact);

router.delete('/:contactId', guard, removeContact);

router.patch('/:contactId', guard, validation.updateContact, updateContact);

router.patch('/:contactId/favorite', guard, validation.updateStatus, updateStatusContact);

module.exports = router;
