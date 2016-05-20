'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;
const mongo = require('./lib/mongodb');

const api = require('./routes/api');

mongo.connect('mongodb://localhost:27017/muststash', () => {
  console.log('mongo connected');
});

app.use(bodyParser.urlencoded({limit: '50mb', extended: true }));
app.use(bodyParser.json({limit: '50mb'}));

app.use('/api', api)

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
