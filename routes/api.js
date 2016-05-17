'use strict';

const express =  require('express');
const router = express.Router();
const url = require('url');

router.route('/')
  .post((req, res, next) => {
    let  data = req.body.data;
    res.json({success: data});
  })
  .get((req, res, next) => {
    let query_string = url.parse(req.url, true).query;
    res.json({success: query_string.q});
  });

module.exports = router;