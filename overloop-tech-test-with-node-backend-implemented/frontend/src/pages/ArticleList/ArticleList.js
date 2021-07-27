import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import { ROUTE_ARTICLE_PREFIX, ROUTE_ARTICLE_CREATE } from '../../constants';
import { listArticles } from '../../services/articles';
import RegionDropdown from '../../components/RegionDropdown/RegionDropdown';
import Form from 'react-bootstrap/Form';

function ArticleList() {
    const [articles, setArticles] = useState([]);
    const [regions, setRegions] = useState([]);
    useEffect(() => {
        const fetchArticles = async () => {
            const data = await listArticles();
            if (regions.length > 0) {
                const filteredData = data.filter((artical) => {
                    return (
                        artical.regions.length === regions.length &&
                        artical.regions.every((regionOne) => {
                            return regions.some((regionTwo) => {
                                return regionOne.id === regionTwo.id;
                            });
                        })
                    );
                });
                setArticles(filteredData);
            }
            else
                setArticles(data);
        };

        fetchArticles();
    }, [regions]);

    const renderArticles = () => articles.map((article) => {
        const { id, title, author } = article;
        let authorFirstName = "";
        let authorLastName = "";

        if (author != null) {
            authorFirstName = author.firstName;
            authorLastName = author.lastName;
        } else {
            authorLastName = 'Unknown';
        }

        return (
            <tr key={id}>
                <td>
                    <Link to={`${ROUTE_ARTICLE_PREFIX}/${id}`}>{title + ' written by ' + authorFirstName + ' ' + authorLastName}</Link>
                </td>
            </tr>
        );
    });

    return (
        <div className="ArticleList">
            <h1>Articles</h1>
            <Link className="d-block mb-3" to={ROUTE_ARTICLE_CREATE}>
                Create a new Article
            </Link>
            <Form.Group>
                <Form.Label>Filter articals by region</Form.Label>
                <RegionDropdown
                    value={regions}
                    onChange={(region) => setRegions(region)} >
                </RegionDropdown>
            </Form.Group>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Title</th>
                    </tr>
                </thead>
                <tbody>
                    {renderArticles()}
                </tbody>
            </Table>
        </div>
    );
}

export default ArticleList;
