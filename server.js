'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json());

app.get('*', function(req, res){
  res.sendFile('./public/index.html',
              {
                root  : __dirname
              });
});


app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
