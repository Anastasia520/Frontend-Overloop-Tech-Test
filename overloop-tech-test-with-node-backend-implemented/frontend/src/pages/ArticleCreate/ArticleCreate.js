import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { ROUTE_ARTICLE_LIST } from '../../constants';
import { createArticle } from '../../services/articles';
import RegionDropdown from '../../components/RegionDropdown/RegionDropdown';
import AuthorDropdown from '../../components/AuthorDropdown/AuthorDropdown';

function ArticleCreate({ submit }) {
    const history = useHistory();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [regions, setRegions] = useState([]);
    const [author, setAuthor] = useState('');
    const [titleValidation, setTitleValidation] = useState(true);
    const [contentValidation, setContentValidation] = useState(true);
    const [authorValidation, setAuthorValidation] = useState(false);
    const [titleError, setTitleError] = useState('Title cannot to be empty');
    const [contentError, setContentError] = useState('Content cannot to be empty');
    const [authorError, setAuthorError] = useState('Select only one or no author');

    const noAuthor = {
        id: 1,
        firstName: "",
        lastName: "Unknown"
    };

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'title':
                if (title == '') {
                    setTitleValidation(true);
                } else {
                    setTitleValidation(false);
                }
                break;
            case 'content':
                if (content == '') {
                    setContentValidation(true);
                } else {
                    setContentValidation(false);
                }
                break;
        }
    }

    const changeAuthorHandler = (author) => {
        if (author.length > 1) {
            setAuthorValidation(true);
        }
        else {
            setAuthor(author);
            setAuthorValidation(false);
        }
    }

    const handleSave = async () => {
        if (!authorValidation && !titleValidation && !contentValidation) {
            if (author[0] == null) {
                author[0] = noAuthor;
            }
            const payload = { title, content, author, regions };
            await createArticle(payload);

            history.push(ROUTE_ARTICLE_LIST);
        }
    };

    return (
        <div data-testid="arcticleCreate" className="ArticleCreate">
            <h1>Create Article</h1>
            <Form>
                <Form.Group>
                    <Form.Label>Title</Form.Label>
                    {(titleValidation && titleError) && <div style={{ fontSize: 12, color: 'red' }}> {titleError}</div>}
                    <Form.Control
                        data-testid="titleInput"
                        name="title"
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        onBlur={(e) => blurHandler(e)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Content</Form.Label>
                    {(contentValidation && contentError) && <div style={{ fontSize: 12, color: 'red' }}> {contentError}</div>}
                    <Form.Control
                        data-testid="contentInput"
                        name="content"
                        as="textarea"
                        placeholder="Content"
                        rows="5"
                        value={content}
                        onChange={(event) => setContent(event.target.value)}
                        onBlur={(e) => blurHandler(e)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Regions</Form.Label>
                    <RegionDropdown
                        value={regions}
                        onChange={(regions) => setRegions(regions)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Author</Form.Label>
                    {(authorValidation && authorError) && <div style={{ fontSize: 12, color: 'red' }}> {authorError}</div>}
                    <AuthorDropdown
                        data-testid="authorInput"
                        value={author}
                        onChange={(author) => changeAuthorHandler(author)}
                    />
                </Form.Group>
                <Button data-testid="submitBtn" variant="primary" onClick={handleSave}>
                    Save Article
                </Button>
            </Form>
        </div>
    );
}

export default ArticleCreate;
