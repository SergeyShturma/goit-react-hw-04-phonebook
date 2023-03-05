import React from 'react';
import PropTypes from 'prop-types';
import css from './ContactList.module.css';
import ContactItem from 'components/ContactItem/ContactItem';

const ContactList = ({ getVisibleContacts, onDelete }) => {
  return (
    <ul className={css.contactList}>
      {getVisibleContacts().map(({ id, name, number }) => (
        <li className={css.item} key={id}>
          <ContactItem
            id={id}
            number={number}
            name={name}
            onDelete={onDelete}
          />
        </li>
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  getVisibleContacts: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ContactList;
