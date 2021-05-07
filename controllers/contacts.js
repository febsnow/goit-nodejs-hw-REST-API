const Contact = require('../model/contacts');

const getContacts = async (req, res, next) => {
  try {
    const userId = req.user ? req.user.id : null;
    const contactsList = await Contact.getContacts(userId, req.query);

    res.json({
      status: 'success',
      code: 200,
      data: { contactsList },
    });
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const userId = req.user ? req.user.id : null;
    const contact = await Contact.getContactById(userId, req.params.contactId);
    if (contact) {
      return res.json({ status: 'success', code: 200, data: { contact } });
    } else {
      return res
        .status(404)
        .json({ status: 'error', code: 404, data: `User with ID ${req.params.contactId} not found` });
    }
  } catch (error) {
    next(error);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const userId = req.user ? req.user.id : null;

    const contact = await Contact.removeContact(userId, req.params.contactId);
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
};

const addContact = async (req, res, next) => {
  try {
    const userId = req.user ? req.user.id : null;
    const contact = await Contact.addContact(userId, req.body);
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
};

const updateContact = async (req, res, next) => {
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

    const userId = req.user ? req.user.id : null;
    const contact = await Contact.updateContact(userId, req.params.contactId, req.body);
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
};

const updateStatusContact = async (req, res, next) => {
  try {
    const userId = req.user ? req.user.id : null;
    const contact = await Contact.updateStatusContact(userId, req.params.contactId, req.body);
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
};

module.exports = {
  getContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
