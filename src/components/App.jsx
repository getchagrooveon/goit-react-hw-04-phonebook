import React, { useEffect, useState } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { SearchFilters } from './SearchFilters/SearchFilters';

const LOCAL_STORAGE_CONTACTS = 'local_contacts';
const DEFAULT_CONTACTS = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export const App = () => {
  const [contacts, setContacts] = useState(
    () =>
      JSON.parse(localStorage.getItem(LOCAL_STORAGE_CONTACTS)) ||
      DEFAULT_CONTACTS
  );
  const [filter, setFilter] = useState('');

  const handleFilterChange = event => {
    setFilter(event.target.value);
  };

  const getFilteredArray = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const handleDelete = id => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
  };

  useEffect(() => {
    const resultContacts = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_CONTACTS)
    );

    if (resultContacts) {
      setContacts(resultContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_CONTACTS, JSON.stringify(contacts));
  }, [contacts]);

  const checkname = newContact => {
    if (
      contacts.find(
        contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
      )
    ) {
      alert(`${newContact.name} is already in contacts`);
      return;
    }
    setContacts(prevState => [newContact, ...prevState]);
  };

  const filteredContacts = getFilteredArray();

  return (
    <>
      <div>
        <h1>Phonebook</h1>
        <ContactForm checkName={checkname} />
        <h2>Contacts</h2>
        <SearchFilters onChange={handleFilterChange} filter={filter} />
        <ContactList contacts={filteredContacts} handleDelete={handleDelete} />
      </div>
    </>
  );
};
