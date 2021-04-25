const Contacts = require('../service/schemas/contact');

const getAllContacts = async () => {
  const result = await Contacts.find({});
  return result;
};

const getContactById = async (id) => {
  const result = await Contacts.findOne({ _id: id });
  return result;
};

const removeContact = async (id) => {
  const contactToRemove = await Contacts.findOne({ _id: id });

  const result = await Contacts.findByIdAndRemove({ _id: id });
  return result;
};

const addContact = async (body) => {
  const result = await Contacts.create(body);
  return result;
};

const updateContact = async (id, body) => {
  const result = await Contacts.findByIdAndUpdate({ _id: id }, { ...body }, { new: true });
  return result;
};

module.exports = {
  getAllContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
