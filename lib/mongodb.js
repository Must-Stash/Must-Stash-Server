'use strict';

const MongoClient = require('mongodb').MongoClient;
let db;

exports.connect = function(url, callback) {
  MongoClient.connect(url, function(err, database) {
    if(err) throw err;
    db = database;
    callback();
  });
};

exports.addQA = function(qaArray, callback) {
  db.collection('QA')
  .insertMany(qaArray, (err, result) => {
    callback(err, result);
  });
};

exports.getQA = function(callback) {
  db.collection('QA')
  .find({}).toArray(callback);
};

exports.getMatchingQA = function(array, callback) {
  db.collection('QA')
  .find({
      "activity.url" : {
        $in : array
      }
  }).toArray(callback);
};

exports.groupUrlQueries = function(array, callback) {
  db.collection('QA')
  .aggregate([
    {
      $match:
      {
        "activity.url": {
          $in : array
        }
      }
    },
    {
      $group:
      {
        _id:
        {
          url: "$activity.url",
          query: "$query.query_string"
        },
        totalViews:
        {
          $sum : 1
        }
      }
    }
    // ,
    // {
    //   $out: "visitCount"
    // }
  ]).toArray(callback);

};