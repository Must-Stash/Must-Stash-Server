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
    q: 'html:' + query
  });
};