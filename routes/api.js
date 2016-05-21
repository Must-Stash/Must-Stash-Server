'use strict';

const express =  require('express');
const router = express.Router();
const url = require('url');
const request = require('request');

const elastic = require('../lib/elasticsearch');
const mongo = require('../lib/mongodb');



router.post('/qa', (req, res, next) => {
  let data = req.body.data;

  for(let i = 0; i < data.length; i++) {
    let query = data[i].query;
    let activity = data[i].activity;
    if(query) {
      let query_string = url.parse(query.url, true).query.q;
      query.query_string = query_string;
    }

    request(activity.url, (error, response, body) => {
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

  mongo.addQA(data, (err, response) => {
    if(err) {
      return res.json({success: false});
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
        console.log("oqScore - top", ES.oqScore);

        QAresults.forEach(function(QA){
          console.log("oqScore - middle", ES.oqScore);

          if(ES._source.url === QA.activity.url){
            if(QA.activity.visitCount) {
              ES.instances += parseInt(QA.activity.visitCount);
            } else {
              ES.instances += 1;
            }
          }

          if(QA.query) {
            console.log("url", QA.activity.url);
            var originalQuery = QA.query.query_string.split(" ");
            var currentQuery = query_string.split(" ");

            console.log("originalQuery",originalQuery);
            console.log("currentQuery",currentQuery);

            for (var i in originalQuery){
              for(var j in currentQuery){
                if(originalQuery[i] === currentQuery[j]){
                  console.log("oq[i]",originalQuery[i]);
                  console.log("cq[i]",currentQuery[j]);
                  ES.oqScore++;
                }
              }
            }
          }

          console.log("OQScore", ES.oqScore);
        });

        function getBaseLog(x, y) {
          return Math.log(y) / Math.log(x);
        }

        console.log("bottom", ES.oqScore);
        ES.totalScore = ES._score * 20 + getBaseLog(5, ES.instances) + ES.oqScore;
        console.log('ES.totalScore', ES.totalScore);
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

router.post('/history', (req, res, next) => {
  res.json({success: true});
});

module.exports = router;