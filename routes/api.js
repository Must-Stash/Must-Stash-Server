'use strict';

const express =  require('express');
const router = express.Router();
const url = require('url');
const request = require('request');

const elastic = require('../lib/elasticsearch');
const mongo = require('../lib/mongodb');
const redis = require('../lib/redis');

router.post('/qa', (req, res, next) => {
  let data = req.body.data;
  mongo.addQA(data, (err, response) => {
    if(err) {
      return res.json({success: false});
    }

    for(let i = 0; i < data.length; i++) {
      redis.newJob(data[i]);
    }

    res.json({success: true});
  });

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

    let hits = response.hits.hits;

    let filteredUrls = hits.reduce((list, url) => {
      if(list[url._source.url]) {
        if(url._score < list[url._source.url]._score) {
          return list;
        }
      }
      list[url._source.url] = url;
      return list;
    }, {});
    let urls = Object.keys(filteredUrls);

    mongo.groupUrlQueries(urls,(err, results) => {
      if(err) {
        return res.status(500).json({success: false});
      }

      let topMatches = [];
      urls.forEach((url) => {
        results.forEach((result) => {
          let filteredId = filteredUrls[url]._id;
          let filteredUrl = filteredUrls[url]._source.url;
          let filteredQuery = filteredUrls[url]._source.query_string;
          let filteredTitle = filteredUrls[url]._source.title;
          let filteredDescription = filteredUrls[url]._source.description;
          let filteredScore = filteredUrls[url]._score;

          if(filteredUrl === result._id.url && filteredQuery === result._id.query) {
            let totalScore = filteredScore + Math.min(5, getBaseLog(3, result.totalViews));
            topMatches.push({
              id: filteredId,
              url: filteredUrl,
              original_query: filteredQuery,
              title: filteredTitle,
              description: filteredDescription,
              totalScore: totalScore
            });
          }
        });
      });

      topMatches.sort(function(a, b){
        return b.totalScore - a.totalScore;
      });

      console.log(topMatches);
      return res.json({success: topMatches});
    });
  })
  .catch((err) => {
    return res.status(500).json({success: false});
  });
});

function getBaseLog(x, y) {
  return Math.log(y) / Math.log(x);
}

module.exports = router;