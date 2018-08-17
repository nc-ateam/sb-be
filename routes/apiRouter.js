const apiRouter = require('express').Router();

apiRouter.get('/', (req, res, next) => {
    res.status(200).send('This is the api root folder');
});

module.exports = { apiRouter };
