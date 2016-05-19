const elasticsearch = require('elasticsearch');

const client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'info'
});

const indexName = 'muststash';

exports.addUrls = function(url, html) {
  return client.create({
    index: indexName,
    type: 'activities',
    body: {
      url: url,
      html: html
    }
  });
};

exports.getUrls = function(query) {
  return client.search({
    index: indexName,
    type: 'activities',
    q: 'html:' + query
  });
};