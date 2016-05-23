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

    redis.newJob(data);

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
    let urls = [];
    let ESresults = response.hits.hits;

    ESresults.forEach(function(element){
      urls.push(element._source.url);
    });

    mongo.getMatchingQA(urls, (error, QAresults) => {

      let topMatches = [];

      ESresults.forEach(function(ES){
        ES.instances = 0;
        ES.oqScore = 0;
        ES.inURL = 0;
        let currentQuery = query_string.split(" ");

        QAresults.forEach(function(QA){
          if(ES._source.url === QA.activity.url){
            if(QA.activity.visitCount) {
              ES.instances += parseInt(QA.activity.visitCount);
            } else {
              ES.instances += 1;
            }
            ES.mongoQA = QA;
          }
        });

        if(ES.mongoQA){
          if(ES.mongoQA.query){
            let originalQuery = ES.mongoQA.query.query_string.split(" ");

            for (let i in originalQuery){
              for(let j in currentQuery){
                if(originalQuery[i] === currentQuery[j]){
                  ES.oqScore++;
                }
              }
            }
          }
        }

        let url = ES._source.url;

        for (let u in currentQuery){
          if(url.indexOf(currentQuery[u]) !== -1){
            ES.inURL += 3;
          }
        }


        function getBaseLog(x, y) {
          return Math.log(y) / Math.log(x);
        }

        ES.totalScore = ES._score * 15 + Math.min(5, getBaseLog(2, ES.instances)) + ES.oqScore * 5 + ES.inURL;

        topMatches.push(ES);

      });

      topMatches.sort(function(a,b){
        return b.totalScore - a.totalScore;
      });

      var topMatchesUnique = [];

      topMatches.forEach(function(element){
        if(topMatchesUnique.length === 0){
          topMatchesUnique.push(element);
        }
        else {
          var url = element._source.url;

          var exists = topMatchesUnique.some(function(element){
            if(element._source.url === url){
              return true;
            }
            return false;
          });

          if(exists === false){
            topMatchesUnique.push(element);
          }
        }
      });

      res.json({
        success: topMatchesUnique
      });
    });


  })
  .catch((err) => {
    res.json({success: false});
  });
});

module.exports = router;