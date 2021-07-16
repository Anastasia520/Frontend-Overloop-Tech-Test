import { render, screen, cleanup, fireEvent} from '@testing-library/react';
import React from 'react';
import ArticleCreate from '../pages/ArticleCreate/ArticleCreate';

test('Title validation error', () => {
    const component = render(<ArticleCreate />);

    const titleInput = component.getByTestId("titleInput");
    expect(titleInput.value).toMatch("");

    fireEvent.blur(titleInput,{target: {value: ''}});
    expect(titleInput.value).toMatch("");

    const errorTitle = component.getByText("Title cannot to be empty");
    expect(errorTitle).toBeInTheDocument();
});

test('Title validation success', () => {
    const component = render(<ArticleCreate />);

    const titleInput = component.getByTestId("titleInput");
    expect(titleInput.value).toMatch("");

    fireEvent.change(titleInput,{target: {value: "title"}});
    expect(titleInput.value).toMatch("title");
});

test('Content validation error', () => {
    const component = render(<ArticleCreate />);

    const contentInput = component.getByTestId("contentInput");
    expect(contentInput.value).toMatch("");

    fireEvent.blur(contentInput,{target: {value: ''}});
    expect(contentInput.value).toMatch("");

    const errorContent = component.getByText("Content cannot to be empty");
    expect(errorContent).toBeInTheDocument();
});

test('Content validation success', () => {
    const component = render(<ArticleCreate />);

    const contentInput = component.getByTestId("contentInput");
    expect(contentInput.value).toMatch("");

    fireEvent.blur(contentInput,{target: {value: "content"}});
    expect(contentInput.value).toMatch("content");
});

// test('Author validation success', () => {
//     const component = render(<ArticleCreate />);

//     const authorInput = component.getByTestId("authorInput");

//     fireEvent.change(authorInput,{value: {
//         id: 1,
//         firstName: "",
//         lastName: "Unknown"
//     }});
//     expect(authorInput.value).toMatch();
// });

test('Submit btn unsuccseful', () => {
    const mockf = jest.fn();
    const component = render(<ArticleCreate submit={mockf}/>);

    const button = component.getByTestId("submitBtn");

    fireEvent.click(button);
    expect(mockf).toHaveBeenCalledTimes(0);
});

test('Submit btn succseful', () => {
    const mockOn = jest.fn();
    const component = render(<ArticleCreate submit={mockOn}/>);

    const button = component.getByTestId("submitBtn");

    const titleInput = component.getByTestId("titleInput");
    expect(titleInput.value).toMatch("");

    fireEvent.change(titleInput,{target: {value: "title"}});
    expect(titleInput.value).toMatch("title");

    const contentInput = component.getByTestId("contentInput");
    expect(contentInput.value).toMatch("");

    fireEvent.blur(contentInput,{target: {value: "content"}});
    expect(contentInput.value).toMatch("content");

    fireEvent.click(button);
   
    expect(mockOn).toHaveBeenCalledTimes(0);
});

