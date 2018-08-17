const express = require('express');
const app = express();
const cors = require('cors');
const { rootRouter } = require('./routes/rootRouter');
const { apiRouter } = require('./routes/apiRouter');

app.use(cors());

app.use('/', rootRouter);
app.use('/api', apiRouter);

module.exports = app;
