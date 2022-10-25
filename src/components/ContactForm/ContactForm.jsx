import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import s from './ContactForm.module.css';

export class Form extends Component {
  state = {
    contacts: [],
    name: '',
    number: '',
  };

  handleChange = e => {
    const { name, value } = e.currentTarget;

    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();

    const newContactData = {
      name: this.state.name,
      number: this.state.number,
    };

    this.props.addContact(newContactData);
    this.setState(() => ({ name: '', number: '' }));
  };

  nameInputId = nanoid();
  numberInputId = nanoid();

  render() {
    return (
      <form onSubmit={this.handleSubmit} className={s.formMain}>
        <label htmlFor={this.nameInputId}>Name</label>
        <br />
        <input
          type="text"
          name="name"
          value={this.state.name}
          onChange={this.handleChange}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          id={this.nameInputId}
          className={s.formInput}
          required
        />
        <br />
        <label htmlFor={this.numberInputId}>Number</label>
        <br />
        <input
          type="tel"
          name="number"
          value={this.state.number}
          onChange={this.handleChange}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          id={this.numberInputId}
          className={s.numberInputId}
          required
        />
        <br />
        <button className={s.buttonForm}>Add contact</button>
      </form>
    );
  }
}