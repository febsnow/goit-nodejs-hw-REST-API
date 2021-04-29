const Contacts = require('../service/schemas/contact');

const getAllContacts = async () => {
  const result = await Contacts.find({});
  return result;
};

const getContactById = async (id) => {
  try {
    const result = await Contacts.findOne({ _id: id });
    return result;
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (id) => {
  try {
    const result = await Contacts.findByIdAndRemove({ _id: id });
    return result;
  } catch (error) {
    console.log(error);
  }
};

const addContact = async (body) => {
  const result = await Contacts.create(body);
  return result;
};

const updateContact = async (id, body) => {
  try {
    const result = await Contacts.findByIdAndUpdate({ _id: id }, { ...body }, { new: true });
    return result;
  } catch (error) {
    console.log(error);
  }
};

const updateStatusContact = async (id, body) => {
  try {
    const result = Contacts.findByIdAndUpdate({ _id: id }, { ...body }, { new: true });
    return result;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
