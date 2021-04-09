const fs = require('fs')
const path = require('path')

const contactsPath = path.resolve('./db/contacts.json')


// Output list of contacts in console.
const listContacts = () => {
  fs.readFile(contactsPath, (err, data) => {
      if (err) {
      console.log(err)
      return process.exit(1)
    }
    const list = data.toString()
    if (!list) {
      return process.exit(1)
    }
    const contacts = JSON.parse(list)
    if (contacts.length === 0) {
      return process.exit(1)
    }
    console.table(contacts)
  })
}

// Found contact by id.
const getContactById = contactId => {
  fs.readFile(contactsPath, (err, data) => {
      if (err) {
        console.log(err)
      return process.exit(1)
    }
    const list = data.toString()
    if (!list) {
      return process.exit(1)
    }
    const contacts = JSON.parse(list)
    const foundContact = contacts.find(({ id }) => id === contactId)
    if (!foundContact) {
      return process.exit(1)
    }
    console.table([foundContact])
  })
}

// Remove contact by id.
function removeContact(contactId) {
  fs.readFile(contactsPath, (err, data) => {
      if (err) {
        console.log(err)
      return process.exit(1)
    }
    const list = data.toString()
    if (!list) {
      return process.exit(1)
    }
    const contacts = JSON.parse(list)
    const filteredContacts = contacts.filter(({ id }) => id !== contactId)
    if (contacts.length === filteredContacts.length) {
      return process.exit(1)
    }
    fs.writeFile(contactsPath, JSON.stringify(filteredContacts), err => {
        if (err) {
        console.log(err)
      return process.exit(1)
    }
        console.log(`Contact with id ${contactId} was deleted.`)
        console.table(filteredContacts)
    })
  })
}

// Adds contact
function addContact(name, email, phone) {
  fs.readFile(contactsPath, (err, data) => {
      if (err) {
        console.log(err)
      return process.exit(1)
    }
    const list = data.toString()
    let contacts = list ? JSON.parse(list) : []
    let id = contacts.length === 0 ? 1 : contacts[contacts.length - 1].id + 1
    
    if (name && email && phone) {
      contacts.push({ id, name, email, phone })
      fs.writeFile(contactsPath, JSON.stringify(contacts), err => {
        if (err) {
          return process.exit(1)
        }
        console.log('Contact was added.')
        console.table(contacts)
      })
    }
  })
}

module.exports = { listContacts, getContactById, removeContact, addContact }