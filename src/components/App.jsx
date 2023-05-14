import { useState, useEffect} from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ConstactList/ContactList';
import { Filter } from './Filter/Filter';
import { Container, PhonebookTitle, ContactsTitle } from './App.styled';

export const App = () => {

  const [contacts, setContacts] = useState(() => {
   return JSON.parse(window.localStorage.getItem('contacts')) ?? [];
  });

  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts))}, [contacts]);

  const addContact = ({name, number}) => {

    const contactNames = contacts.map(contact => contact.name);
    const isExist = contactNames.includes(name);
    if (isExist) {
      return alert(`${name} is already in contacts.`)
    };

    const contact = {
      id: nanoid(),
      name,
      number
    };
   setContacts(prevContacts => [contact, ...prevContacts]);
  };

  const deleteContact = contactName => {
    setContacts(prevContacts => prevContacts.filter(contact => contact.name !== contactName));
  };

  const changeFilter = event => {
    setFilter(event.currentTarget.value);
  };

  const getFilteredContacts =() => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter));
  };

  const filtredContacts = getFilteredContacts();

  return (
    <Container> 
      <PhonebookTitle>Phonebook</PhonebookTitle>
      <ContactForm onSubmit={addContact}/>
      <ContactsTitle>Contacts</ContactsTitle>
      <Filter 
      value={filter}
      onChange={changeFilter}
      />
      <ContactList 
      contacts={filtredContacts}
      onDeleteContact={deleteContact}
      />
    </Container>
  );
}




