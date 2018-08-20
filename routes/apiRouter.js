const apiRouter = require('express').Router();
const { countryRouter, cityRouter, landmarkRouter } = require('./index');

apiRouter.get('/', (req, res, next) => {
    res.status(200).send('This is the api root folder');
});

apiRouter.use('/countries', countryRouter);
apiRouter.use('/cities', cityRouter);
apiRouter.use('/landmarks', landmarkRouter);

module.exports = { apiRouter };
