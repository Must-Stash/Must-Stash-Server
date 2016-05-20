const mongoose = require('mongoose');

const querySchema = new mongoose.Schema({
  frameId: {type: Number},
  fromCache: {type: Boolean},
  interaction: {type: String},
  ip: {type: String},
  method: {type: String},
  parentFrameId: {type: Number},
  requestId: {type: String},
  statusCode: {type: Number},
  statusLine: {type: String},
  tabId: {type: Number, required: true},
  timeStamp: {type: Date, required: true},
  type: {type: String},
  url: {type: String, required: true}
});

var Query = mongoose.model('Query', querySchema);
module.exports = Query;