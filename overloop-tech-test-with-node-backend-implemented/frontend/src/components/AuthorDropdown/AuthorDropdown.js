import React, { useState, useEffect } from 'react';
import Multiselect from 'react-widgets/lib/Multiselect';
import { listAuthors } from '../../services/authors';

function AuthorDropdown({ value, onChange }) {
    const [author, setAuthor] = useState([]);

    useEffect(() => {
        const fetchAuthors = async () => {
            let data = await listAuthors();
            let newData = data.filter(item => item.id > 1)
            setAuthor(newData);
        };

        fetchAuthors();
    }, []);

    return (
        <div className="AuthorDropdown">
            <Multiselect
                data-testid="authorInput"
                value={value}
                data={author}
                textField="lastName"
                valueField="id"
                onChange={onChange}
                allowCreate={false}
            />
        </div>
    );
}

export default AuthorDropdown;