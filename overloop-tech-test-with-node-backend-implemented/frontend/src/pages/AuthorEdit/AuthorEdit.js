import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { ROUTE_AUTHOR_LIST } from '../../constants';
import { getAuthor, editAuthor } from '../../services/authors';

function AuthorEdit(props) {
    const history = useHistory();
    const { authorId } = useParams();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [firstNameValidation, setFirstNameValidation] = useState(false);
    const [lastNameValidation, setLastNameValidation] = useState(false);
    const [firstNameError, setFirstNameError] = useState('First name cannot to be empty');
    const [lastNameError, setLastNameError] = useState('Last name cannot to be empty');

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'firstName':
                if (firstName == '') {
                    setFirstNameValidation(true);
                } else {
                    setFirstNameValidation(false);
                }
                break;
            case 'lastName':
                if (lastName == '') {
                    setLastNameValidation(true);
                } else {
                    setLastNameValidation(false);
                }
                break;
        }
    }

    useEffect(() => {
        const fetchAuthor = async () => {
            const data = await getAuthor(authorId);
            setFirstName(data.firstName);
            setLastName(data.lastName);
        };

        fetchAuthor();
    }, [authorId]);

    const handleSave = async () => {
        if (!firstNameValidation && !lastNameValidation) {
            const payload = { firstName, lastName };
            await editAuthor(authorId, payload);
            history.push(ROUTE_AUTHOR_LIST);
        }
    };

    return (
        <div className="AuthorEdit">
            <h1>Edit Author</h1>
            <Form>
                <Form.Group>
                    <Form.Label>First Name</Form.Label>
                    {(firstNameValidation && firstNameError) && <div style={{ fontSize: 12, color: 'red' }}> {firstNameError}</div>}
                    <Form.Control
                        name="firstName"
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(event) => setFirstName(event.target.value)}
                        onBlur={(e) => blurHandler(e)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Last Name</Form.Label>
                    {(lastNameValidation && lastNameError) && <div style={{ fontSize: 12, color: 'red' }}> {lastNameError}</div>}
                    <Form.Control
                        name="lastName"
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(event) => setLastName(event.target.value)}
                        onBlur={(e) => blurHandler(e)}
                    />
                </Form.Group>

                <Button variant="primary" onClick={handleSave}>
                    Save Author
                </Button>
            </Form>
        </div>
    );
}

export default AuthorEdit;