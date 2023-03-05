import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import css from 'components/App.module.css';
import ContactList from 'components/ContactList/ContactList';
import ContactForm from 'components/ContactForm/ContactForm';
import Filter from 'components/Filter/Filter';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  nameId = nanoid();
  numberId = nanoid();

  onSubmit = data => {
    console.log(data);
  };

  addContact = (name, number) => {
    const { contacts } = this.state;
    const newContact = {
      id: nanoid(),
      name,
      number,
    };
    contacts.some(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    )
      ? alert(`${name} is already in contacts`)
      : this.setState(prevState => ({
          contacts: [newContact, ...prevState.contacts],
        }));
  };

  onDelete = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  componentDidMount() {
    const parsedContacts = JSON.parse(localStorage.getItem('contacts'));

    parsedContacts && this.setState({ contacts: parsedContacts });
  }

  componentDidUpdate(prevProps, prevState) {
    this.state.contacts !== prevState.contacts &&
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  }

  render() {
    const { addContact, changeFilter, onDelete, getVisibleContacts } = this;
    const { filter } = this.state;

    return (
      <div className={css.main}>
        <h1 className={css.title}>Phonebook</h1>
        <ContactForm onSubmit={addContact} />
        <h2 className={css.title}>Contacts</h2>
        <Filter value={filter} onChange={changeFilter} />
        <ContactList
          getVisibleContacts={getVisibleContacts}
          onDelete={onDelete}
        />
      </div>
    );
  }
}

export default App;
