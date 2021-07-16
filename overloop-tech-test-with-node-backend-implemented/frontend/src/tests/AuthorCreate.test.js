import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import React from 'react';
import AuthorCreate from '../pages/AuthorCreate/AuthorCreate';

test('First name validation error', () => {
    const component = render(<AuthorCreate />);

    const firstNameInput = component.getByTestId("firstNameInput");
    expect(firstNameInput.value).toMatch("");

    fireEvent.blur(firstNameInput, { target: { value: '' } });
    expect(firstNameInput.value).toMatch("");

    const errorName = component.getByText("First name cannot to be empty");
    expect(errorName).toBeInTheDocument();
});

test('First name validation success', () => {
    const component = render(<AuthorCreate />);

    const firstNameInput = component.getByTestId("firstNameInput");
    expect(firstNameInput.value).toMatch("");

    fireEvent.blur(firstNameInput, { target: { value: "First" } });
    expect(firstNameInput.value).toMatch("First");
});

test('Last Name validation error', () => {
    const component = render(<AuthorCreate />);

    const lastNameInput = component.getByTestId("lastNameInput");
    expect(lastNameInput.value).toMatch("");

    fireEvent.blur(lastNameInput, { target: { value: '' } });
    expect(lastNameInput.value).toMatch("");

    const errorName = component.getByText("Last name cannot to be empty");
    expect(errorName).toBeInTheDocument();
});

test('Last Name validation success', () => {
    const component = render(<AuthorCreate />);

    const lastNameInput = component.getByTestId("lastNameInput");
    expect(lastNameInput.value).toMatch("");

    fireEvent.blur(lastNameInput, { target: { value: "Last" } });
    expect(lastNameInput.value).toMatch("Last");
});

test('Submit btn unsuccessful', () => {
    const mockf = jest.fn();
    const component = render(<AuthorCreate submit={mockf} />);

    const button = component.getByTestId("submitBtn");

    fireEvent.click(button);
    expect(mockf).toHaveBeenCalledTimes(0);
});

test('Submit btn succseful', () => {
    const mockOn = jest.fn();
    const component = render(<AuthorCreate submit={mockOn} />);

    const button = component.getByTestId("submitBtn");

    const firstNameInput = component.getByTestId("firstNameInput");
    expect(firstNameInput.value).toMatch("");

    fireEvent.blur(firstNameInput, { target: { value: "First" } });
    expect(firstNameInput.value).toMatch("First");

    const lastNameInput = component.getByTestId("lastNameInput");
    expect(lastNameInput.value).toMatch("");

    fireEvent.blur(lastNameInput, { target: { value: "Last" } });
    expect(lastNameInput.value).toMatch("Last");

    fireEvent.click(button);

    expect(mockOn).toHaveBeenCalledTimes(0);
});

