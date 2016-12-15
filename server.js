var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var db;
var password = "bjarne";
var APP_PATH = path.join(__dirname, 'dist');


/*
Handy CURL commands:

curl -X PUT http://localhost:3000/api/business -d '{"name" : "Kastner Konstruction", "owner" Kastner Family", "service" : "Konstruction - We make easy jobs look hard.", "email" : "me@somedomain.com", "address" : "8888 No Street Nowhere, MI 00000", "phone" : "444-444-4444" }' -H 'Content-Type: application/json'


*/

Array.prototype.diff = function(a) {
    return this.filter(function(i) {return a.indexOf(i) < 0;});
};



app.set('port', (process.env.PORT || 3000));
app.use('/', express.static(APP_PATH));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Additional middleware which will set headers that we need on each request.
app.use(function(req, res, next) {
  // Set permissive CORS header - this allows this server to be used only as
  // an API server in conjunction with something like webpack-dev-server.
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Disable caching so we'll always get the latest comments.
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

app.get('/api/jobs', function(req, res) {
  db.collection("job").find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    res.json(docs);
  });
});

//this is the request sent from the "submit" button on the user form
app.put('/api/volunteer', function(req, res) {
	/*
		req.body: {
			jobsChecked: []
			email: ''
			name: ''
			businessInfo: ''
		}
  */
	var previousJobs = []
  var jobsToAdd = []
	//first goal: add person to jobsChecked
  if (typeof req.body["jobsChecked"] != 'undefined') {
    	db.collection("job").find({ "workers" : { "$in" : [req.body.name]} }).toArray(function(err, jobs) {

      for (var job of jobs) {
        previousJobs.push(job.title)
      }

      jobsToAdd = req.body.jobsChecked.diff(previousJobs)

      for (var job of jobsToAdd) {
          db.collection("job").update({"title" : job}, { $push: { "workers" : req.body.name.trim()}})
      }

      //second goal: update person
      var emailTokens = req.body.email.split("@")

      var volunteer

      if (req.body.email != '') {
        volunteer = {
          name : req.body.name.trim(),
          email : req.body.email.trim(),
          id : emailTokens[0],
          jobsDesired : previousJobs.concat(jobsToAdd)
        } 
      } else {
        volunteer = {
          name : req.body.name,
          id : emailTokens[0],
          jobsDesired : previousJobs.concat(jobsToAdd)
        } 
      }

      db.collection("volunteers").update({"id" : volunteer.id}, volunteer, {upsert: true})
    })
  }




  ///third goal: add in business info
  if (req.body.businessInfo != '') {
      //must update business info
      var businessObject = {
        owner_name : req.body.name.trim(),
        email : req.body.email.trim(),
        businessDescription : req.body.businessInfo.trim()
      }

      db.collection("business").update({"name" : businessObject.owner_name}, businessObject, {upsert: true})
  }
  res.json(200)
})

app.post('/api/jobs', function(req, res) {
        var newJob = {
            title: req.body.volunteer_job,
            description: req.body.volunteer_description,
            workers: []
        };
        db.collection("job").insertOne(newJob, function(err, result) {
        if (err) throw err;
        db.collection("job").find({}).toArray(function(err, docs) {
            if (err) throw err;
            res.json(docs);
        });
    });
})


app.use('*', express.static(APP_PATH));

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});

MongoClient.connect('mongodb://cs336:' + password + '@ds111788.mlab.com:11788/duttonportal', function (err, dbConnection) {
  if (err) { throw err; }
  db = dbConnection;
});
