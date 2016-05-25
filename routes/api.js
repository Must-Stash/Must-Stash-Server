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

router.get('/betterSearch', (req, res, next) => {
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
      console.log(results);
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
            console.log("FILTERED URL", filteredUrl);
            let totalScore = filteredScore + Math.min(5, getBaseLog(2, result.totalViews));
            //console.log(filteredScore, totalScore);
            topMatches.push({
              id: filteredId,
              url: filteredUrl,
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

      return res.json({success: topMatches});
    });
  })
  .catch((err) => {
    return res.status(500).json({success: false});
  });
});

// router.get('/search', (req, res, next) => {
//   let query_string = url.parse(req.url, true).query.q;
//   elastic.getUrls(query_string)
//   .then((response) => {
//     let urls = [];
//     let ESresults = response.hits.hits;

//     ESresults.forEach(function(element){
//       urls.push(element._source.url);
//     });

//     mongo.getMatchingQA(urls, (error, QAresults) => {

//       let topMatches = [];

//       ESresults.forEach(function(ES){
//         ES.instances = 0;
//         ES.oqScore = 0;
//         ES.inURL = 0;
//         let currentQuery = query_string.split(" ");

//         QAresults.forEach(function(QA){
//           if(ES._source.url === QA.activity.url){
//             if(QA.activity.visitCount) {
//               ES.instances += parseInt(QA.activity.visitCount);
//             } else {
//               ES.instances += 1;
//             }
//             ES.mongoQA = QA;
//           }
//         });

//         if(ES.mongoQA){
//           if(ES.mongoQA.query){
//             let originalQuery = ES.mongoQA.query.query_string.split(" ");

//             for (let i in originalQuery){
//               for(let j in currentQuery){
//                 if(originalQuery[i] === currentQuery[j]){
//                   ES.oqScore++;
//                 }
//               }
//             }
//           }
//         }

//         let url = ES._source.url;

//         for (let u in currentQuery){
//           if(url.indexOf(currentQuery[u]) !== -1){
//             ES.inURL += 3;
//           }
//         }


//         function getBaseLog(x, y) {
//           return Math.log(y) / Math.log(x);
//         }

//         ES.totalScore = ES._score * 15 + Math.min(5, getBaseLog(2, ES.instances)) + ES.oqScore * 5 + ES.inURL;

//         topMatches.push(ES);

//       });

//       topMatches.sort(function(a,b){
//         return b.totalScore - a.totalScore;
//       });

//       var topMatchesUnique = [];

//       topMatches.forEach(function(element){
//         if(topMatchesUnique.length === 0){
//           topMatchesUnique.push(element);
//         }
//         else {
//           var url = element._source.url;

//           var exists = topMatchesUnique.some(function(element){
//             if(element._source.url === url){
//               return true;
//             }
//             return false;
//           });

//           if(exists === false){
//             topMatchesUnique.push(element);
//           }
//         }
//       });

//       console.log(topMatchesUnique);
//       res.json({
//         success: topMatchesUnique
//       });
//     });


//   })
//   .catch((err) => {
//     console.log(err);
//     res.status(500).json({success: false});
//   });
// });

function getBaseLog(x, y) {
  return Math.log(y) / Math.log(x);
}

module.exports = router;