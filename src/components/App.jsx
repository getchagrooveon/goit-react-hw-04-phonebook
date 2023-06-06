import React, { Component } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { SearchFilters } from './SearchFilters/SearchFilters';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  handleFilterChange = event => {
    this.setState({ filter: event.target.value });
  };

  getFilteredArray = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };
  handleDelete = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  LOCAL_STORAGE_CONTACTS = 'local_contacts';

  componentDidMount() {
    const resultContacts = JSON.parse(
      localStorage.getItem(this.LOCAL_STORAGE_CONTACTS)
    );

    if (resultContacts) {
      this.setState({ contacts: resultContacts });
    }
  }
  componentDidUpdate(predProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem(
        this.LOCAL_STORAGE_CONTACTS,
        JSON.stringify(this.state.contacts)
      );
    }
  }

  checkname = newContact => {
    if (
      this.state.contacts.find(
        contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
      )
    ) {
      alert(`${newContact.name} is already in contacts`);
      return;
    }
    this.setState(prevState => ({
      contacts: [newContact, ...prevState.contacts],
    }));
  };

  render() {
    const contacts = this.getFilteredArray();
    return (
      <>
        <div>
          <h1>Phonebook</h1>
          <ContactForm
            onSubmit={this.handleSubmit}
            checkName={this.checkname}
          />
          <h2>Contacts</h2>
          <SearchFilters
            onChange={this.handleFilterChange}
            filter={this.state.filter}
          />
          <ContactList contacts={contacts} handleDelete={this.handleDelete} />
        </div>
      </>
    );
  }
}
