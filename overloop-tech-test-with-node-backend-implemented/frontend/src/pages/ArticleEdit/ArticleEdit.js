import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { ROUTE_ARTICLE_LIST } from '../../constants';
import { getArticle, editArticle } from '../../services/articles';
import RegionDropdown from '../../components/RegionDropdown/RegionDropdown';
import AuthorDropdown from '../../components/AuthorDropdown/AuthorDropdown';

function ArticleEdit(props) {
    const history = useHistory();
    const { articleId } = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [regions, setRegions] = useState([]);
    const [author, setAuthor] = useState('');
    const [titleValidation, setTitleValidation] = useState(false);
    const [contentValidation, setContentValidation] = useState(false);
    const [authorValidation, setAuthorValidation] = useState(false);
    const [titleError, setTitleError] = useState('Title cannot be empty');
    const [contentError, setContentError] = useState('Content cannot be empty');
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

    useEffect(() => {
        const fetchArticle = async () => {
            const data = await getArticle(articleId);
            setTitle(data.title);
            setContent(data.content);
            setRegions(data.regions);
            setAuthor([data.author]);
        };

        fetchArticle();
    }, [articleId]);

    const handleSave = async () => {
        if (!authorValidation && !titleValidation && !contentValidation) {
            if (author[0] == null) {
                author[0] = noAuthor;
            }
            const payload = { title, content, author, regions };
            await editArticle(articleId, payload);
            history.push(ROUTE_ARTICLE_LIST);
        }
    };

    return (
        <div className="ArticleEdit">
            <h1>Edit Article</h1>
            <Form>
                <Form.Group>
                    <Form.Label>Title</Form.Label>
                    {(titleValidation && titleError) && <div style={{ fontSize: 12, color: 'red' }}> {titleError}</div>}
                    <Form.Control
                        name='title'
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
                        name='content'
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
                    <Form.Label>Authors</Form.Label>
                    {(authorValidation && authorError) && <div style={{ fontSize: 12, color: 'red' }}> {authorError}</div>}
                    <AuthorDropdown
                        value={author}
                        onChange={(author) => changeAuthorHandler(author)}
                    />
                </Form.Group>
                <Button variant="primary" onClick={handleSave}>
                    Save Article
                </Button>
            </Form>
        </div>
    );
}

export default ArticleEdit;
