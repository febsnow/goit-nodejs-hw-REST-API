const Contact = require('../service/schemas/contact');

const getAllContacts = async () => {
  const result = await Contact.find({});
  return result;
};

const getContactById = async (id) => {
  try {
    const result = await Contact.findOne({ _id: id });
    return result;
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (id) => {
  try {
    const result = await Contact.findByIdAndRemove({ _id: id });
    return result;
  } catch (error) {
    console.log(error);
  }
};

const addContact = async (body) => {
  const result = await Contact.create(body);
  return result;
};

const updateContact = async (id, body) => {
  try {
    const result = await Contact.findByIdAndUpdate({ _id: id }, { ...body }, { new: true });
    return result;
  } catch (error) {
    console.log(error);
  }
};

const updateStatusContact = async (id, body) => {
  try {
    const result = Contact.findByIdAndUpdate({ _id: id }, { ...body }, { new: true });
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
