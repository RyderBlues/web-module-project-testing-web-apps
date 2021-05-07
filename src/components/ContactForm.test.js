import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm/>);
});

test('renders the contact form header', ()=> {
    render(<ContactForm/>);

    const header = screen.queryByText(/contact form/i);

    expect(header).toBeInTheDocument();
    expect(header).toBeTruthy();
    expect(header).toHaveTextContent(/contact form/i);
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm/>);

    const nameInput = screen.getByLabelText(/first name/i);
    
    userEvent.type(nameInput, 'abcd');

    const errorDisplay = await screen.getByText(/error: firstname must have at least 5 characters/i);
    expect(errorDisplay).toBeInTheDocument();
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm/>);

    const submitBtn = screen.getByRole("button");

    userEvent.click(submitBtn);

    const firstError = await screen.getByText(/Error: firstName must have at least 5 characters/i);
    const secondError = await screen.getByText(/Error: lastName is a required field/i);
    const thirdError = await screen.getByText(/Error: email must be a valid email address/i);

    expect(firstError).toBeInTheDocument();
    expect(secondError).toBeInTheDocument();
    expect(thirdError).toBeInTheDocument();
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm/>);
    const firstName = screen.getByLabelText(/first name/i);
    const lastName = screen.getByLabelText(/last name/i);
    const submitBtn = screen.getByRole("button");

    userEvent.type(firstName, 'abcd');
    userEvent.type(lastName, 'abcd');
    userEvent.click(submitBtn);

    const error = await screen.getByText(/Error: email must be a valid email address/i);
    
    expect(error).toBeInTheDocument();
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm/>);

    const email = screen.getByLabelText(/Email/i);
    userEvent.type(email, 'abcdefg');

    const error = await screen.getByText(/Error: email must be a valid email address/i);

    expect(error).toBeInTheDocument();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render (<ContactForm/>);

    const firstName = screen.getByLabelText(/first name/i);
    const email = screen.getByLabelText(/Email/i);
    const submitBtn = screen.getByRole("button");
    
    userEvent.type(email, 'abcdefg');
    userEvent.type(firstName, 'abcdefg');
    userEvent.click(submitBtn);

    const error = await screen.getByText(/Error: lastName is a required field/i);

    expect(error).toBeInTheDocument();

});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm/>);
    
    const firstName = screen.getByLabelText(/first name/i);
    const lastName = screen.getByLabelText(/last name/i);
    const email = screen.getByLabelText(/Email/i);
    const submitBtn = screen.getByRole("button");

    userEvent.type(email, 'abcdefg@yahoo.com');
    userEvent.type(firstName, 'abcdefghi');
    userEvent.type(lastName, 'blahblah')
    userEvent.click(submitBtn);

    const success = await screen.getByText(/you submitted:/i);
    const firstNameSuccess = await screen.getByText(/First Name:/i);
    const lastNameSuccess = await screen.getByText(/First Name:/i);
    const emailSuccess = await screen.getByText(/First Name:/i);
    // const message = await screen.getByText(/message:/i);

    expect(success).toBeInTheDocument();
    expect(firstNameSuccess).toBeInTheDocument();
    expect(lastNameSuccess).toBeInTheDocument();
    expect(emailSuccess).toBeInTheDocument();
    // expect(message).not.toBeInTheDocument();

});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm/>);
    
    // const firstName = screen.getByLabelText(/first name/i);
    // const lastName = screen.getByLabelText(/last name/i);
    // const email = screen.getByLabelText(/Email/i);
    // const message = screen.getByLabelText(/message/i);
    // const submitBtn = screen.getByRole("button");

    // userEvent.type(email, 'abcdefg@yahoo.com');
    // userEvent.type(firstName, 'abcdefg');
    // userEvent.type(lastName, 'blah')
    // userEvent.type(message, 'message yup')
    // userEvent.click(submitBtn);

    // const success = await screen.getByText(/you submitted:/i);
    // const firstNameSuccess = await screen.getByText(/First Name:/i);
    // const lastNameSuccess = await screen.getByText(/First Name:/i);
    // const emailSuccess = await screen.getByText(/First Name:/i);
    // const message = await screen.getByText(/message:/i);

    // expect(success).toBeInTheDocument();
    // expect(firstNameSuccess).toBeInTheDocument();
    // expect(lastNameSuccess).toBeInTheDocument();
    // expect(emailSuccess).toBeInTheDocument();
    // expect(message).toNotBeInTheDocument();
});