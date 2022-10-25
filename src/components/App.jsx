import { useState, useEffect } from 'react';
import { Form } from './ContactForm/ContactForm';
import { Section } from './Section/Section';
import { PhoneList } from './PhoneList/PhoneList';
import { Filter } from './ContactFilter/ContactFilter';
import { nanoid } from 'nanoid';
export const App =() => {
  
  const [contacts, setContacts] = useState (() => JSON.parse(localStorage.getItem('contacts')) || [
     { id: 'id-1', name: 'Rosie Simpson', number: '453-32-89' },
      { id: 'id-2', name: 'Hermione Kline', number: '836-74-43' },
      { id: 'id-3', name: 'Eden Clements', number: '134-43-34' },])

  const [filter, setFilter] = useState('');
  
  useEffect(() => {
       localStorage.setItem('contacts', JSON.stringify(contacts))
  }, [contacts])
  
  const addContact = newContact => {
    const newContactEntity = {
      id: nanoid(),
      ...newContact,
    };
    contacts.find(contact => contact.name.toLowerCase() === newContactEntity.name.toLowerCase())
      ? alert(`${newContactEntity.name} is already in contacts!`)
      : setContacts(state => ([...state, newContactEntity]));
  };

  const handleFilterContactsByName = e => {
    const { value } = e.target;
    setFilter(value);
  };

  const deleteContact = id => {
    setContacts(prevState => (prevState.filter(contact => contact.id !== id)));
  };

  const contactsByName = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
  );



    return (
      <>
        <Section title="Phonebook">
          <Form addContact={addContact} />
        </Section>
        <Section title="Contacts">
          <Filter
            filter={filter}
            onChange={handleFilterContactsByName}
          />
          <PhoneList contacts={contactsByName} onDelete={deleteContact} />
        </Section>
      </>
    );
  }
