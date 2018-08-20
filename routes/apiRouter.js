const apiRouter = require('express').Router();
const { countryRouter, cityRouter } = require('./index');

apiRouter.get('/', (req, res, next) => {
    res.status(200).send('This is the api root folder');
});

apiRouter.use('/countries', countryRouter);
apiRouter.use('/cities', cityRouter);

module.exports = { apiRouter };
