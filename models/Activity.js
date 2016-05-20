const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  frameId: {type: String},
  interaction: {type: String},
  processId: {type: Number},
  tabId: {type: Number, required: true},
  timeStamp: {type: Date, required: true},
  transitionQualifier: {type: [String]},
  transitionType: {type: String},
  url: {type: String, required: true}
});

var Activity = mongoose.model('Activity', activitySchema);
module.exports = Activity;