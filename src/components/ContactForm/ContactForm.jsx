import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import s from './ContactForm.module.css';

export const Form = ({ addContact }) => {
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
    
const handleChange = e => {
    const { name, value } = e.currentTarget;
    
    switch (name) {
      case 'number':
        setNumber(value);
        break;
      
      case 'name':
        setName(value);
        break;
      
      default:
        return;     
    }
  };
   const handleSubmit = event => {
    event.preventDefault();

    const newContactData = {
      name,
      number,
    };

    addContact(newContactData);
    setName('');
    setNumber('');
  };
return (
      <form onSubmit={handleSubmit} className={s.formMain}>
        <label htmlFor={nanoid()}>Name</label>
        <br />
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          id={nanoid()}
          className={s.formInput}
          required
        />
        <br />
        <label htmlFor={nanoid()}>Number</label>
        <br />
        <input
          type="tel"
          name="number"
          value={number}
          onChange={handleChange}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          id={nanoid()}
          required
        />
        <br />
        <button className={s.buttonForm}>Add contact</button>
      </form>
    );
  }

Form.propTypes = {
  addContact: PropTypes.func.isRequired
  }


