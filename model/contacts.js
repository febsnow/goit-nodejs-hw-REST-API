const db = require('./db');
const { ObjectId } = require('mongodb');

const listContacts = async (db, name) => {
  const client = await db;
  const collection = await client.db().collection(name);
  return collection;
};

const getAllContacts = async () => {
  const collection = await listContacts(db, 'contacts');
  const result = await collection.find().toArray();
  return result;
};

const getContactById = async (id) => {
  const collection = await listContacts(db, 'contacts');
  const objectId = new ObjectId(id);
  const [result] = await collection.find({ _id: objectId }).toArray();
  return result;
};

const removeContact = async (id) => {
  const collection = await listContacts(db, 'contacts');
  const objectId = new ObjectId(id);
  const { value: result } = await collection.findOneAndDelete({ _id: objectId });
  return result;
};

const addContact = async (body) => {
  const newEntry = {
    ...body,
    ...(body.favorite ? {} : { favorite: false }),
  };
  const collection = await listContacts(db, 'contacts');
  const {
    ops: [result],
  } = await collection.insertOne(newEntry);
  return result;
};

const updateContact = async (id, body) => {
  const collection = await listContacts(db, 'contacts');
  const objectId = new ObjectId(id);
  const { value: result } = await collection.findOneAndUpdate(
    { _id: objectId },
    { $set: body },
    { returnOriginal: false }
  );
  return result;
};

module.exports = {
  getAllContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};

// const contactsPath = path.join(__dirname, './contacts.json');

// const listContacts = async () => {
//   const contacts = await fs.readFile(contactsPath);
//   const parsedContacts = JSON.parse(contacts);
//   return parsedContacts;
// };

// const getContactById = async (contactId) => {
//   const contacts = await listContacts();
//   const contactToFind = contacts.find((contact) => contact.id == contactId);
//   return contactToFind;
// };

// const removeContact = async (contactId) => {
//   const contacts = await listContacts();
//   const contactToRemove = await getContactById(contactId);

//   if (!contactToRemove) {
//     return console.log(`Contact with ID ${contactId} not found`);
//   }

//   const filteredContacts = contacts.filter((contact) => contact.id != contactToRemove.id);
//   await fs.writeFile(contactsPath, JSON.stringify(filteredContacts, null, '\t'));
//   return filteredContacts;
// };

// const addContact = async (body) => {
//   const contacts = await listContacts();
//   const id = uuidv4();
//   const newContact = {
//     id,
//     ...body,
//   };

//   // if (!body.name || !body.email || !body.phone) {
//   //   return;
//   // }

//   contacts.push(newContact);
//   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, '\t'));

//   return newContact;
// };

// const updateContact = async (contactId, body) => {
//   const contactsList = await listContacts();
//   const contactToUpdate = await getContactById(contactId);
//   console.log('before', contactToUpdate);

//   if (!contactToUpdate) {
//     return console.log(`Contact with ID ${contactId} not found`);
//   }

//   const updatedContact = Object.assign(contactToUpdate, body);
//   console.log('after', updatedContact);

//   const updatedContactsList = contactsList.map((contact) => {
//     if (contact.id == contactId) {
//       return updatedContact;
//     } else {
//       return contact;
//     }
//   });

//   await fs.writeFile(contactsPath, JSON.stringify(updatedContactsList, null, '\t'));
//   return updatedContact;
// };

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// };
