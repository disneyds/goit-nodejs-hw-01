const {
  listContacts,
  getContactById,
  removeContact,
  addContact
} = require('./contacts')


const invokeActions = ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
      listContacts()
      break

    case 'get':
      if (id && +id) {
        getContactById(+id)
      } else {
        process.exit(1)
      }
      break

    case 'add':
      if (name && email && phone) {
        addContact(name, email, phone)
      } else {
        process.exit(1)
      }
      break

    case 'remove':
      if (id && +id) {
        removeContact(+id)
      } else {
        process.exit(1)
      }
      break

    default:
      console.warn('\x1B[31m Unknown action type!')
      process.exit(1)
  }
}

module.exports = { invokeActions }