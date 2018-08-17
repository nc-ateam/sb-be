const rootRouter = require('express').Router();

rootRouter.get('/', (req, res, next) => {
    res.status(200).send('Welcome to our API!');
});

module.exports = { rootRouter };
