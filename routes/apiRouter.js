const apiRouter = require('express').Router();
const {
    countryRouter,
    cityRouter,
    landmarkRouter,
    userRouter,
    photoRouter
} = require('./index');

apiRouter.get('/', (req, res, next) => {
    res.status(200).send('This is the api root folder');
});

apiRouter.use('/countries', countryRouter);
apiRouter.use('/cities', cityRouter);
apiRouter.use('/landmarks', landmarkRouter);
apiRouter.use('/users', userRouter);
apiRouter.use('/photos', photoRouter);

module.exports = { apiRouter };
