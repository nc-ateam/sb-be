const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const path = require('path');
const { DB_URL } = require('./db/config');
const cors = require('cors');
const { rootRouter } = require('./routes/rootRouter');
const { apiRouter } = require('./routes/apiRouter');

app.use(cors());
app.use(bodyParser.json(), express.static(__dirname + "/public"));
app.use(express.static(path.join(__dirname, 'public')));

// useNewUrlParser is set to true as old is being phased out.

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

app.use('/*', (req, res) => {
    res.status(404).send('Page not found');
});

app.use((err, req, res, next) => {
    if (err.status === 404)
        res.status(err.status).send({ message: err.message });
    else if (err.status === 400)
        res.status(err.status).send({ message: err.message });
    else if (err.name === 'TypeError')
        res.status(400).send({ message: `Bad Request: ${err}` });
    else if (err.name === 'CastError')
        res.status(400).send({
            message: `Bad Request: ${err.value} is an invalid ID`
        });
    else if (err.name === 'ValidationError')
        res.status(400).send({
            message: 'Bad Request: a required field is missing!'
        });
    else res.status(500).send({ message: 'Internal Server Error' });
});

module.exports = app;
