'use strict';

const express =  require('express');
const router = express.Router();
const url = require('url');

const Query = require('../models/Query');

//interaction
router.post('/queries', (req, res, next) => {
  let  data = req.body.data;

  let queries = data.filter((request) => {
    return request.interaction === 'query';
  }).map((query) => {
    return {
      query: query.url,
      timestamp: query.timestamp,
      tabId: query.tabId,
      urls: []
    };
  });

  // console.log(queries);
  let activities = data.filter((data) => {
    return data.interaction === 'activity';
  }).forEach((activity) => {
    let found = false;
    for(let i = queries.length - 1; i >= 0; i--) {
      if(activity.tabId === queries[i].tabId && activity.timestamp > queries[i].timestamp) {
        found = true;
        queries[i].urls.push(activity);
        break;
      }
    }

    Query.insertMany(queries)
    .then(() => {
      console.log('ADDED');
    })
    .catch((err) => {
     console.log(err);
    });

  //   if(!found) {
  //     let last_query = Query.find({
  //       tabId: activity.tabId,
  //       interaction: 'query',
  //       timestamp: {
  //         $lt: activity.timestamp
  //       }
  //     }).sort('-timestamp').limit(1);
  //   }
  //   console.log(last_query);
  });

  res.json({success: queries});
});

router.get('/search', (req, res, next) => {
  let query_string = url.parse(req.url, true).query;
  res.json({success: query_string.q});
});

router.post('/history', (req, res, next) => {
  res.json({success: true});
});

module.exports = router;