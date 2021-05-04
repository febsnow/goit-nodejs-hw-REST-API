const Contacts = require('../service/schemas/contact');

const getAllContacts = async (userId, query) => {
  const { sortBy, sortByDesc, filter, favorite = null, limit = 0, offset = 0 } = query;

  let result = await Contacts.find({ owner: userId })
    .sort({
      ...(sortBy ? { [`${sortBy}`]: 1 } : {}),
      ...(sortByDesc ? { [`${sortByDesc}`]: -1 } : {}),
    })
    .limit(limit && Number(limit))
    .skip(offset && Number(offset))
    .populate({
      path: 'owner',
      select: 'email subscription -_id',
    });
  if (favorite === false) {
    return (result = await Contacts.find({ owner: userId, favorite: false }).populate({
      path: 'owner',
      select: 'email subscription -_id',
    }));
  }
  if (favorite === true) {
    return (result = await Contacts.find({ owner: userId, favorite: true }).populate({
      path: 'owner',
      select: 'email subscription -_id',
    }));
  }

  return result;
};

const getContactById = async (userId, id) => {
  try {
    const result = await Contacts.findOne({ _id: id, owner: userId }).populate({
      path: 'owner',
      select: 'email subscription -_id',
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (userId, id) => {
  try {
    const result = await Contacts.findByIdAndRemove({ _id: id, owner: userId });
    return result;
  } catch (error) {
    console.log(error);
  }
};

const addContact = async (userId, body) => {
  const result = await Contacts.create({ ...body, owner: userId });
  return result;
};

const updateContact = async (userId, id, body) => {
  try {
    const result = await Contacts.findByIdAndUpdate({ _id: id, owner: userId }, { ...body }, { new: true }).populate({
      path: 'owner',
      select: 'email subscription -_id',
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

const updateStatusContact = async (userId, id, body) => {
  try {
    const result = Contacts.findByIdAndUpdate({ _id: id, owner: userId }, { ...body }, { new: true }).populate({
      path: 'owner',
      select: 'email subscription -_id',
    });
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
