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

    data.forEach((qa) => {
      redis.newJob(qa);
    });

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
    var urls = [];
    var ESresults = response.hits.hits;

    ESresults.forEach(function(element){
      urls.push(element._source.url);
    });

    mongo.getMatchingQA(urls, (error, QAresults) => {

      var topMatches = [];

      ESresults.forEach(function(ES){
        ES.instances = 0;
        ES.oqScore = 0;

        QAresults.forEach(function(QA){
          if(ES._source.url === QA.activity.url){
            if(QA.activity.visitCount) {
              ES.instances += QA.activity.visitCount;
            } else {
              ES.instances += 1;
            }
          }

          if(QA.query) {
            var originalQuery = QA.query.query_string.split(" ");
            var currentQuery = query_string.split(" ");

            for (var i in originalQuery){
              for(var j in currentQuery){
                if(originalQuery[i] === currentQuery[j]){
                  ES.oqScore++;
                }
              }
            }
          }

        });

        ES.totalScore = ES._score * 10 + ES.instances + ES.oqScore;

        topMatches.push(ES);

      });

      topMatches.sort(function(a,b){
        return b.totalScore - a.totalScore;
      });

      res.json({
        success: topMatches,
        QA: QAresults,
        query : query_string
      });
    });


  })
  .catch((err) => {
    res.json({success: false});
  });
});

module.exports = router;