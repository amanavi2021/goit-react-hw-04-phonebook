import React, { useState } from "react";
import PropTypes from 'prop-types';
import { ContactsForm, AddBtn, InputInfo, LabelNumber } from "./ContactForm.styled";

export const ContactForm = ({ onSubmit }) => {

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = event => {
    const { name, value } = event.currentTarget;
    switch (name) {
       case 'name':
        setName(value);
        break;
       case 'number':
        setNumber(value);
        break;
       default:
        alert('Wrong type of name');
    }
   };
    
    const handleSubmit = event => {
        event.preventDefault();
        onSubmit({name, number});
        reset();
    };

    const reset = () => {
        setName('');
        setNumber('');
    };

    return (
        <ContactsForm onSubmit={handleSubmit}>
                <label>Name
                <InputInfo
                type="text"
                name="name"
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                required
                value={name}
                onChange={handleChange}
                />
                </label>
                <LabelNumber>Number
                <InputInfo
                type="tel"
                name="number"
                pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                required
                value={number}
                onChange={handleChange}
                />
                </LabelNumber>  
            <AddBtn type='submit'>Add contact</AddBtn>
        </ContactsForm>
    )
};

ContactForm.propTypes = {
onSubmit: PropTypes.func
}