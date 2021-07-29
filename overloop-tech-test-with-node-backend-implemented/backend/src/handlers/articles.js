import Article from '../models/Article';
import Region from '../models/Region';

export default {
    list: async (req, res, next) => {
        try {
            const articles = await Article.findAll({ include: ['author', 'regions'] });
            return res.json(articles);
        } catch (err) {
            next(err);
        }
    },
    filtered: async (req, res, next) => {
        try {
            const regions = req.body;

            const articles = await Article.findAll({ include: ['author', 'regions'] });
            const filteredData = articles.filter((artical) => {
                return (
                    artical.regions.length === regions.length &&
                    artical.regions.every((regionOne) => {
                        return regions.some((regionTwo) => {
                            return regionOne.id === regionTwo.id;
                        });
                    })
                );
            });
            return res.json(filteredData);
        } catch (err) {
            next(err);
        }
    },
    get: async (req, res, next) => {
        try {
            const article = await Article.findByPk(req.params.articleId, { include: ['author', 'regions'] });

            if (!article)
                return res.sendStatus(404);

            return res.json(article);
        } catch (err) {
            next(err);
        }
    },
    create: async (req, res, next) => {
        try {
            const article = await Article.create(req.body);

            if (req.body.author) {
                await article.setAuthor(req.body.author.map(({ id }) => id));
                await article.reload({ include: ['author', 'regions'] });
            }

            if (req.body.regions) {
                await article.setRegions(req.body.regions.map(({ id }) => id));
                await article.reload({ include: ['author', 'regions'] });
            }

            return res.json(article);
        } catch (err) {
            next(err);
        }
    },
    update: async (req, res, next) => {
        try {
            await Article.update(req.body, { where: { id: req.params.articleId } });
            const article = await Article.findByPk(req.params.articleId, { include: ['author', 'regions'] });

            if (req.body.regions) {
                await article.setRegions(req.body.regions.map(({ id }) => id));
                await article.reload({ include: ['author', 'regions'] });
            }

            if (req.body.author) {
                await article.setAuthor(req.body.author.map(({ id }) => id));

                await article.reload({ include: ['author', 'regions'] });
            }

            return res.json(article);
        } catch (err) {
            next(err);
        }
    }
};
