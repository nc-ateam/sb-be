const apiRouter = require('express').Router();
let path = require('path');
const {
    countryRouter,
    cityRouter,
    landmarkRouter,
    userRouter,
    photoRouter
} = require('./index');

apiRouter.get('/', (req, res, next) => {
    res.status(200).sendFile('api.html', {
        root: path.join('public')
    });
});

apiRouter.use('/countries', countryRouter);
apiRouter.use('/cities', cityRouter);
apiRouter.use('/landmarks', landmarkRouter);
apiRouter.use('/users', userRouter);
apiRouter.use('/photos', photoRouter);

module.exports = { apiRouter };
