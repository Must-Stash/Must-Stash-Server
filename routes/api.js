'use strict';

const express =  require('express');
const router = express.Router();
const url = require('url');

const Query = require('../models/Query');
const Activity = require('../models/Activity');

router.post('/queries', (req, res, next) => {
  let data = req.body.data;

  let queries = [];
  let activities = [];

  for(let i = 0; i < data.length; i++) {
    if(data[i].interaction === 'query') {
      queries.push(data[i]);
    } else if(data[i].interaction === 'activity') {
      activities.push(data[i]);
    }
  }

  Query.insertMany(queries)
  .then((queries) => {
    Activity.insertMany(activities)
    .then((activities) => {
      res.json({success: true});
    })
    .catch((err) => {
      res.json({success: false})
    });
  })
  .catch((err) => {
    res.json({success: false})
  });

});

router.get('/search', (req, res, next) => {
  let query_string = url.parse(req.url, true).query;
  res.json({success: query_string.q});
});

router.post('/history', (req, res, next) => {
  res.json({success: true});
});

module.exports = router;