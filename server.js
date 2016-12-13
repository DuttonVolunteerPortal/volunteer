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


//get a list of all the businesses
app.get('/api/business', function(req, res) {
  db.collection("business").find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    res.json(docs);
  });
});


/* add or update a business
If the business (based on the name field) does not exist, it is created.
If the business already exists, all fields are changed to match the values give.

This means that even if you update one filed, you must send back the original values of all the other fields.
*/
app.put('/api/business', function(req, res) {
  db.collection("business").updateOne({name: req.body.name}, {name: req.body.name, owner: req.body.owner, service: req.body.service, email: req.body.email, address: req.body.address, phone: req.body.phone},{upsert: true}, function(err, result){
    console.log(req.body.name);//logging output for debugging purposes
    console.log(req.body.owner);
    console.log(req.body.phone);

    if (err) throw err;
    res.json(200);
  });
})

/*add or update a volunteer
If the volunteer (based on the id field, the prefix of their email address) does not exist, they are created.
If the volunteer already exists, all fields are changed to match the values give.
This means that even if you update one field, you must send back the original values of all the other fields.
*/

app.put('/api/volunteer', function(req, res) {
  var jobsIWant = req.body.jobsIWant;
  //split prefix off of email address
  var emailTokens = req.body.email.split("@");
  console.log(emailTokens);//for debugging purposes

//remove the volunteer from the jobs they unchecked.
  db.collection("job").updateMany({ title: { $nin: jobsIWant } }, {$pullAll: { workers: [req.body.volunteerName] } }, function(err, result){
    if (err) throw err;
  });

//add the volunteer to the jobs they checked
  db.collection("job").updateMany({ title: { $in: jobsIWant } }, {$push: { workers: req.body.volunteerName } }, function(err, result){
    if (err) throw err;
  });
//update the volunteer's info.
  db.collection("volunteers").updateOne({id: emailTokens[0]}, {id: emailTokens[0], email: req.body.email, name: req.body.volunteerName, phone: req.body.phone, jobsIWant: jobsIWant}, {upsert: true}, function(err, result){
    console.log(req.body.email);//logging output for debugging purposes
    console.log(req.body.volunteerName);
    console.log(req.body.jobsIWant);

    if (err) throw err;
    res.json(200);
  });
})




/*get a volunteer by providing their email address
returns an array with (hopefully) one element.
*/
app.get('/api/volunteer/:email', function(req, res) {
  //split prefix off of email address
  var emailTokens = req.params.email.split("@");
  console.log(emailTokens);//for debugging
  db.collection("volunteers").find({id: emailTokens[0]}).toArray(function(err, volunteers) {
    assert.equal(err, null);
    res.json(volunteers);
  });
})



app.get('/api/volunteer/:email/jobsIwant', function(req, res) {
  //split prefix off of email address
  var emailTokens = req.params.email.split("@");
  console.log(emailTokens);//for debugging
  db.collection("volunteers").find({id: emailTokens[0]}).toArray(function(err, volunteers) {
    assert.equal(err, null);
    res.json(volunteers);
  });
})


/*get a business by providing its name address
returns an array with (hopefully) one element.
I'me using the prefix of the owner's personal email address as a way to identify the business.
This way we can update the name later if necessary and it gives us a short way to refer to the business.

*/
app.get('/api/business/:ownerEmail', function(req, res) {
  //split prefix off of email address
  var emailTokens = req.params.ownerEmail.split("@");
  console.log(emailTokens);//for debugging
  db.collection("business").find({ownerID: emailTokens[0]}).toArray(function(err, businesses) {
    assert.equal(err, null);
    res.json(businesses);
  });
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
