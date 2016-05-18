const mongoose = require('mongoose');

const querySchema = new mongoose.Schema({
  query: {type: String, required: true},
  timestamp: {type: Date, required: true},
  tabId: {type: Number, required: true},
  urls: {type: [mongoose.Schema.Types.Mixed]}
});

var Query = mongoose.model('Query', querySchema);
module.exports = Query;