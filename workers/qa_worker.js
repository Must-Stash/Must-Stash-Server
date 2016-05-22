'use strict';

const kue = require('kue');
const queue = kue.createQueue();
const request = require('request');
const url = require('url');
const elastic = require('../lib/elasticsearch');

queue.process('new_qa', 5, function(job, ctx, done){
  let activity = job.data.activity;
  let query = job.data.query;

  let query_string = null;

  if(query) {
    query_string = url.parse(query.url, true).query.q;
    query.query_string = query_string;
  }

  request(activity.url, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      elastic.addUrls(query_string, response.request.uri.href, body)
      .then((response) => {
        console.log("SUCCESS", activity.url);
        return done();
      })
      .catch((err) => {
        console.log("ERROR", err);
        return done(err);
      });
    }
    done(error);
  });
});