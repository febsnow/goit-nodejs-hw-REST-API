const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// const contacts = require('./contacts.json');

const contactsPath = path.join(__dirname, './contacts.json');

// async function writeAndShowContacts(data) {
//   try {
//     fs.writeFile(contactsPath, JSON.stringify(data, null, '\t')).then(console.table(data));
//   } catch (error) {
//     console.log(error);
//   }
// }

// async function getContactsList() {
//   try {
//     const contacts = await fs.readFile(contactsPath);
//     const parsedContacts = JSON.parse(contacts);
//     return parsedContacts;
//   } catch (error) {
//     console.log(error);
//   }
// }

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  const parsedContacts = JSON.parse(contacts);
  return parsedContacts;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contactToFind = contacts.find((contact) => contact.id == contactId);
  return contactToFind;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const filteredContacts = contacts.filter((contact) => contact.id != contactId);
  await fs.writeFile(contactsPath, JSON.stringify(filteredContacts, null, '\t'));
  return filteredContacts;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const id = uuidv4();
  const newContact = {
    id,
    ...body,
  };

  if (!body.name || !body.email || !body.phone) {
    return;
  }

  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, '\t'));

  return newContact;
};

const updateContact = async (contactId, body) => {
  const contactsList = await listContacts();
  const contactToUpdate = await getContactById(contactId);
  console.log('before', contactToUpdate);

  const updatedContact = Object.assign(contactToUpdate, body);
  console.log('after', updatedContact);

  const updatedContactsList = contactsList.map((contact) => {
    contact.id == contactId ? updatedContact : contact;
  });

  await fs.writeFile(contactsPath, JSON.stringify(updatedContactsList, null, '\t'));
  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
