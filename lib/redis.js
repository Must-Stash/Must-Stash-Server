const kue = require('kue');
const queue = kue.createQueue();

queue.on('job complete', function(id, result){
  kue.Job.get(id, function(err, job){
    if (err) return;
    job.remove(function(err){
      if (err) throw err;
      console.log('removed completed job #%d', job.id);
    });
  });
});

exports.newJob = function(qa) {
  var job = queue.create('new_qa', qa)
  .save(function(err) {
      if(!err) console.log("SAVED", job.id);
  });
};