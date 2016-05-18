'use strict';

const express =  require('express');
const router = express.Router();
const url = require('url');

const Query = require('../models/Query');
const Activity = require('../models/Activity');

router.post('/queries', (req, res, next) => {
  let data = req.body.data;

  let queries = data.filter((dataItem) => {
    return dataItem.interaction === 'query';
  });

  Query.insertMany(queries)
  .then((queries) => {
    console.log("QUERIES", queries);
  })
  .catch((err) => {
   console.log("QUERIES ERROR", err);
  });

  let activities = data.filter((dataItem) => {
    return dataItem.interaction === 'activity';
  });

  Activity.insertMany(activities)
  .then((activities) => {
    console.log("ACTIVITIES", activities);
  })
  .catch((err) => {
   console.log("ACTIVITIES ERROR", err);
  });

  res.json({success: true});
});

// router.post('/activities', (req, res, next) => {
//   let activies = req.body.activities;

//   Activity.insertMany(data)
//   .then((activities) => {
//     console.log(activities);
//   })
//   .catch((err) => {
//    console.log(err);
//   });

//   res.json({success: true});
// });

router.get('/search', (req, res, next) => {
  let query_string = url.parse(req.url, true).query;
  res.json({success: query_string.q});
});

router.post('/history', (req, res, next) => {
  res.json({success: true});
});

module.exports = router;