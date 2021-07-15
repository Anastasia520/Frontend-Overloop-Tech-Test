import sequelize from '../src/connectors/sequelize';
import models from '../src/models';

const { Region } = models;
const { Author } = models;

(async () => {
    await sequelize.sync({ force: true });

    Region.create({ code: 'AU', name: 'Australia' });
    Region.create({ code: 'UK', name: 'United Kingdom' });
    Region.create({ code: 'US', name: 'United States of America' });
    Author.create({ id: 0, firstName: '', lastName: 'Unknown' });
})();
