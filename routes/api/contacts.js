const express = require('express');
const router = express.Router();
const guard = require('../../helpers/guard');
const validation = require('./contacts-validation-schema');
const {
  getContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
  updateStatusContact,
} = require('../../controllers/contacts');

router.get('/', guard, validation.queryContact, getContacts).post('/', guard, validation.addContact, addContact);

router
  .get('/:contactId', guard, getContactById)
  .delete('/:contactId', guard, removeContact)
  .patch('/:contactId', guard, validation.updateContact, updateContact);

router.patch('/:contactId/favorite', guard, validation.updateStatus, updateStatusContact);

module.exports = router;
