const express = require('express');
const router = express.Router();
const validation = require('./contacts-validation-schema');

const contacts = require('../../model/contacts');

router.get('/', async (req, res, next) => {
  try {
    const contactsList = await contacts.getAllContacts();
    res.json({
      status: 'success',
      code: 200,
      data: { contactsList },
    });
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const contact = await contacts.getContactById(req.params.contactId);
    if (contact) {
      return res.json({ status: 'success', code: 200, data: { contact } });
    } else {
      return res.status(404).json({ status: 'error', code: 404, data: 'Not Found' });
    }
  } catch (error) {
    next(error);
  }
});

router.post('/', validation.addContact, async (req, res, next) => {
  try {
    const contact = await contacts.addContact(req.body);
    if (!contact) {
      return res.status(400).json({
        code: 400,
        data: {
          message: 'missing required field',
        },
      });
    } else {
      return res.status(201).json({
        code: 201,
        data: {
          contact,
        },
      });
    }
  } catch (error) {
    next(error);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const contact = await contacts.removeContact(req.params.contactId);
    if (contact) {
      return res.json({
        status: 'success',
        code: 200,
        data: {
          message: 'Contact deleted',
        },
      });
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        data: 'Not Found',
      });
    }
  } catch (e) {
    next(e);
  }
});

router.patch('/:contactId', validation.updateContact, async (req, res, next) => {
  try {
    // if (Object.keys(req.body).length === 0) {
    //   return res.json({
    //     status: 'error',
    //     code: 400,
    //     data: {
    //       message: 'missing fields',
    //     },
    //   });
    // }

    const contact = await contacts.updateContact(req.params.contactId, req.body);
    if (contact) {
      return res.json({
        status: 'success',
        code: 200,
        data: {
          contact,
        },
      });
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        data: 'Not Found',
      });
    }
  } catch (e) {
    next(e);
  }
});

router.patch('/:contactId/favorite', validation.updateStatus, async (req, res, next) => {
  try {
    // if (Object.keys(req.body).length === 0) {
    //   return res.json({
    //     status: 'error',
    //     code: 400,
    //     data: {
    //       message: 'missing fields',
    //     },
    //   });
    // }

    const contact = await contacts.updateStatusContact(req.params.contactId, req.body);

    if (contact) {
      return res.json({
        status: 'success',
        code: 200,
        data: {
          contact,
        },
      });
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        data: 'Not Found',
      });
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
