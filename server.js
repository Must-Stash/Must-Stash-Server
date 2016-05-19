'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;

const api = require('./routes/api');

mongoose.connect("mongodb://localhost:27017/muststash");
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("mongoose connected!");
});

app.use(bodyParser.urlencoded({limit: '50mb', extended: true }));
app.use(bodyParser.json({limit: '50mb'}));

app.use('/api', api)

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
