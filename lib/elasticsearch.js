const elasticsearch = require('elasticsearch');

const client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'info'
});

const indexName = 'muststash';

exports.addUrls = function(query_string, url, title, description, html) {
  return client.create({
    index: indexName,
    type: 'activities',
    body: {
      query_string: query_string,
      url: url,
      title: title,
      description: description,
      html: html
    }
  });
};

exports.getUrls = function(query) {
  return client.search({
    index: indexName,
    type: 'activities',
    body: {
      // "fields": [
      //   "query_string",
      //   "description",
      //   "title",
      //   "url"
      // ],
      "query": {
        "multi_match": {
           "type": "cross_fields",
           "query": query,
           "fields": [
              "title^2",
              "query_string^2",
              "html"
           ]
        }
      }
    },
    size: 20
    // q: 'html:' + query
  });
};