'use strict';

const express =  require('express');
const router = express.Router();
const url = require('url');
const request = require('request');

const elastic = require('../lib/elasticsearch');
const mongo = require('../lib/mongodb');

//const Query = require('../models/Query');
//const Activity = require('../models/Activity');

// router.post('/queries', (req, res, next) => {
//   let data = req.body.data;

//   let queries = [];
//   let activities = [];

//   for(let i = 0; i < data.length; i++) {
//     if(data[i].interaction === 'query') {
//       queries.push(data[i]);
//     } else if(data[i].interaction === 'activity') {
//       activities.push(data[i]);
//     }
//   }

//   Query.insertMany(queries)
//   .then((queries) => {
//     Activity.insertMany(activities)
//     .then((activities) => {
//       res.json({success: true});
//     })
//     .catch((err) => {
//       res.json({success: false})
//     });
//   })
//   .catch((err) => {
//     res.json({success: false})
//   });

// });

router.post('/qa', (req, res, next) => {
  let data = req.body.data;

  for(let i = 0; i < data.length; i++) {
    let query = data[i].query;
    let activity = data[i].activity;

    if(query.tabId === activity.tabId && query.timeStamp < activity.timeStamp) {
      request(data[i].url, (error, response, body) => {
        if (!error && response.statusCode == 200) {
          elastic.addUrls(response.request.uri.href, body)
          .then((response) => {
            res.json({success: response.hits.hits});
          })
          .catch((err) => {
            res.json({success: false});
          });
        }
      });
    }
  }

  mongo.addQA(data, (err, response) => {
    if(err) {
      return res.json({success: false});
    }
    res.json({success: true});
  });

  // for(let i = 0; i < data.length; i++) {
  //   request(data[i].url, (error, response, body) => {
  //     if (!error && response.statusCode == 200) {
  //       elastic.addUrls(response.request.uri.href, body)
  //       .then((response) => {
  //         res.json({success: response.hits.hits});
  //       })
  //       .catch((err) => {
  //         res.json({success: false})
  //       });
  //     }
  //   });
  // }
});

router.get('/qa', (req, res, next) => {
  mongo.getQA((err, response) => {
    if(err) {
      return res.json({success: false});
    }
    res.json({success: response});
  });
});

router.get('/search', (req, res, next) => {
  let query_string = url.parse(req.url, true).query.q;
  elastic.getUrls(query_string)
  .then((response) => {
    res.json({success: response.hits.hits});
  })
  .catch((err) => {
    res.json({success: false});
  });
});

router.post('/history', (req, res, next) => {
  res.json({success: true});
});

module.exports = router;