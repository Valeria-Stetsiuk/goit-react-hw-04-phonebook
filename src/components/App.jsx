import { Component } from 'react';
import { Form } from './ContactForm/ContactForm';
import { Section } from './Section/Section';
import { PhoneList } from './PhoneList/PhoneList';
import { Filter } from './ContactFilter/ContactFilter';
import { nanoid } from 'nanoid';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '453-32-89' },
      { id: 'id-2', name: 'Hermione Kline', number: '836-74-43' },
      { id: 'id-3', name: 'Eden Clements', number: '134-43-34' },
    ],
    filter: '',
  };
    componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const nextContacts = this.state.contacts;
    const prevContacts = prevState.contacts;

    if (nextContacts !== prevContacts) {
      localStorage.setItem('contacts', JSON.stringify(nextContacts));
    }
  }

  addContact = newContact => {
    const newContactEntity = {
      id: nanoid(),
      ...newContact,
    };
    this.state.contacts.find(
      contact =>
        contact.name.toLowerCase() === newContactEntity.name.toLowerCase()
    )
      ? alert(`${newContactEntity.name} is already in contacts!`)
      : this.setState(state => ({
          contacts: [...state.contacts, newContactEntity],
        }));
  };

  handleFilterContactsByName = e => {
    const { value } = e.target;
    this.setState(() => ({ filter: value }));
  };
    deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

    render() {
    const contactsByName = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );

    return (
      <>
        <Section title="Phonebook">
          <Form addContact={this.addContact} />
        </Section>
        <Section title="Contacts">
          <Filter
            filter={this.state.filter}
            onChange={this.handleFilterContactsByName}
          />
          <PhoneList contacts={contactsByName} onDelete={this.deleteContact} />
        </Section>
      </>
    );
  }
}