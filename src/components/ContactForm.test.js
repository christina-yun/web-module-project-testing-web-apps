import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm />)
});

test('renders the contact form header', ()=> {
    render(<ContactForm />)
    const cfForm = screen.getByText(/contact form/i)
    expect(cfForm).toBeInTheDocument();
    expect(cfForm).toBeTruthy();
    expect(cfForm).toHaveTextContent('Contact Form');

});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />);
    const firstNameInput = screen.getByPlaceholderText('Edd');
    userEvent.type(firstNameInput, 'Cat');
    await waitFor(() => {
        const nameError = screen.queryByText('Error: firstName must have at least 5 characters.');
        expect(nameError).toBeInTheDocument();
    })
    
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />)
    
    const fnInput= screen.getByLabelText(/First Name*/i);
    userEvent.type(fnInput, '');
    
    const lnInput = screen.getByLabelText(/Last Name*/i);
    userEvent.type(lnInput, '');

    const email = screen.getByLabelText(/email*/i);
    userEvent.type(email, '');

    const submit = screen.getByRole('button');
    userEvent.click(submit);

    await waitFor(() => {
    const fnError= screen.queryByText(/Error: firstName must have at least 5 characters./i);
    expect(fnError).toBeInTheDocument();

    const lnError = screen.queryByText(/Error: lastName is a required field./i);
    expect(lnError).toBeInTheDocument();

    const emailError = screen.queryByText(/Error: email must be a valid email address./i);
    expect(emailError).toBeInTheDocument();

    })

});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />)
    const fnInput= screen.getByLabelText(/First Name*/i);
    userEvent.type(fnInput, 'Kelly');
    
    const lnInput = screen.getByLabelText(/Last Name*/i);
    userEvent.type(lnInput, 'Baptista');

    const email = screen.getByLabelText(/email*/i);
    userEvent.type(email, '');

    const submit = screen.getByRole('button');
    userEvent.click(submit);

    await waitFor(() => {
    const fnError= screen.queryByText(/Error: firstName must have at least 5 characters./i);
    expect(fnError).not.toBeInTheDocument();

    const lnError = screen.queryByText(/Error: lastName is a required field./i);
    expect(lnError).not.toBeInTheDocument();

    const emailError = screen.queryByText(/Error: email must be a valid email address./i);
    expect(emailError).toBeInTheDocument();
    })
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />)

    const email = screen.getByLabelText(/email*/i);
    userEvent.type(email, 'dfsa');


    await waitFor(() => {
    const emailError = screen.queryByText(/Error: email must be a valid email address./i);
    expect(emailError).toBeInTheDocument();
    })
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />)
    const fnInput= screen.getByLabelText(/First Name*/i);
    userEvent.type(fnInput, 'Shreyas');
    
    const lnInput = screen.getByLabelText(/Last Name*/i);
    userEvent.type(lnInput, '');

    const email = screen.getByLabelText(/email*/i);
    userEvent.type(email, 'shreyas.mohan@gmail.com');

    const submit = screen.getByRole('button');
    userEvent.click(submit);

    await waitFor(() => {

    const lnError = screen.queryByText(/Error: lastName is a required field./i);
    expect(lnError).toBeInTheDocument();
    })
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm />)
    const fnInput= screen.getByLabelText(/First Name*/i);
    userEvent.type(fnInput, 'Sebastian');
    
    const lnInput = screen.getByLabelText(/Last Name*/i);
    userEvent.type(lnInput, 'Mohan');

    const email = screen.getByLabelText(/email*/i);
    userEvent.type(email, 'imacat@cat.com');

    const messageInput = screen.getByLabelText(/message/i);
    userEvent.type(messageInput, '');

    const submit = screen.getByRole('button');
    userEvent.click(submit);

    await waitFor(() => {
    const firstName = screen.getByTestId('firstnameDisplay');
    expect(firstName).toBeInTheDocument();

    const lastName = screen.getByTestId('lastnameDisplay');
    expect(lastName).toBeInTheDocument();

    const emailDisplay = screen.getByTestId('emailDisplay');
    expect(emailDisplay).toBeInTheDocument();

    const message = screen.queryByTestId('messageDisplay')

    expect(message).not.toBeInTheDocument();
    })
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm />)
    const fnInput= screen.getByLabelText(/First Name*/i);
    userEvent.type(fnInput, 'Sebastian');
    
    const lnInput = screen.getByLabelText(/Last Name*/i);
    userEvent.type(lnInput, 'Mohan');

    const email = screen.getByLabelText(/email*/i);
    userEvent.type(email, 'imacat@cat.com');

    const messageInput = screen.getByLabelText(/message/i);
    userEvent.type(messageInput, 'TESTING');

    const submit = screen.getByRole('button');
    userEvent.click(submit);

    await waitFor(() => {
    const firstName = screen.getByTestId('firstnameDisplay');
    expect(firstName).toBeInTheDocument();

    const lastName = screen.getByTestId('lastnameDisplay');
    expect(lastName).toBeInTheDocument();

    const emailDisplay = screen.getByTestId('emailDisplay');
    expect(emailDisplay).toBeInTheDocument();

    const message = screen.getByTestId('messageDisplay')
    expect(message).toBeInTheDocument();

    })
});