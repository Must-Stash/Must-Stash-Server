'use strict';

const express =  require('express');
const router = express.Router();
const url = require('url');

const Query = require('../models/Query');

router.route('/')
  .post((req, res, next) => {
    let  data = req.body.data;
    res.json({success: data});
  })
  .get((req, res, next) => {
    let query_string = url.parse(req.url, true).query;
    res.json({success: query_string.q});
  });

router.post('/history', (req, res, next) => {
  res.json({success: true});
});

module.exports = router;