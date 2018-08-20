const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { DB_URL } = require('./db/config');
const cors = require('cors');
const { rootRouter } = require('./routes/rootRouter');
const { apiRouter } = require('./routes/apiRouter');

app.use(cors());

mongoose
    .connect(
        DB_URL,
        { useNewUrlParser: true }
    )
    .then(() => {
        console.log(`Connection to mongoose is live on ${DB_URL}`);
    });

app.use('/', rootRouter);
app.use('/api', apiRouter);

module.exports = app;
