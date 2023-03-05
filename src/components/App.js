import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import css from 'components/App.module.css';
import ContactList from 'components/ContactList/ContactList';
import ContactForm from 'components/ContactForm/ContactForm';
import Filter from 'components/Filter/Filter';
import Notification from 'components/Notification/Notification';
import NotificationGood from 'components/NotificationGood/NotificationGood';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem('contacts')) ?? [];
  });

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (name, number) => {
    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    if (
      contacts.some(
        contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
      )
    ) {
      toast(`${name} is already in contacts.`);
      return;
    }

    setContacts(prevContacts => [newContact, ...prevContacts]);
  };

  const deleteContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  return (
    <div className={css.main}>
      <h1 className={css.title}>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2 className={css.title}>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      <>
        {getVisibleContacts().length ? (
          <>
            <ContactList
              getVisibleContacts={getVisibleContacts}
              onDelete={deleteContact}
            />
            <NotificationGood />
          </>
        ) : (
          <Notification />
        )}
      </>
      <ToastContainer autoClose={2000} />
    </div>
  );
}
