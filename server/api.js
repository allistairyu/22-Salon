// Express router for our API.
// Every URL starting with /api/ will be directed here
// This is a basic CRUD API for our Users MongoDB database

const express = require('express');
const ObjectId = require('mongodb').ObjectId;
var router = express.Router();  // get an instance of the express Router
let mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/my_database', { useNewUrlParser: true, useUnifiedTopology: true });

//Define our schema for User
let User = mongoose.model('User', {
  firstName: String,
  lastName: String,
  date: String,
  time: String,
  email: String,
  phoneNumber: String,
  services: [String]
});

// If the database is empty, insert some dummy data into it
User.find((err, users) => {
  /*
  var testUsers = [
    { firstName: 'yo', lastName: 'lastname', date: 'the date', time: 'the time', email: 'asdf@gmail.com', number: '323-312-6838' },
    { firstName: 'ribgjhf', lastName: 'lastname', date: 'the date2', time: 'the time2', email: 'fdsa@gmail.com', number: '323-312-6838' },
    { firstName: 'werqnb', lastName: 'asewrdf', date: 'the date3', time: 'the time3', email: 'poui@gmail.com', number: '323-312-6838' }
  ];

  User.collection.insert(testUsers, (err, users) => { if (err) console.log(err); })
  */
});
// Now, we list all of our routes.
// Note that the actual routes you specify here will be prefixed by /api

//Routed to GET /api/users
router.get('/users', (req, res) => {
  User.find((err, users) => {
    if (err) {
      console.log(err);
      res.send([]);
    } else {
      res.json(users);
    }
  });
});
//TODO: INCORPORATE SERVICES INTO DATABASE
router.post('/users', (req, res) => {
  const doc = new User({ firstName: req.body.firstName, lastName: req.body.lastName, phoneNumber: req.body.phoneNumber, email: req.body.email, services: JSON.stringify(req.body.services) });
  doc.save();
});

router.delete('/users/:id', async (req, res) => {
  const identification = new ObjectId(req.params.id)
  await User.deleteOne({'_id': identification}, function(err, res) {
    if (err) console.log(err)
  })
})

module.exports = router
