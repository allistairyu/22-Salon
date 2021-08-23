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
  services: [String],
  timestamp: String
}, 'User');

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

router.get('/users/:date', (req, res) => {
  let usersOnDate = []
  // try {
  //   for (const u in User.find({date: req.params.date})) {
  //     usersOnDate.push(u)
  //   }
  //   res.json(usersOnDate);
  // } catch (e) {
  //   console.log(e)
  // }
  User.find({date: req.params.date}, (err, users) => { 
    if (err) {
      console.log(err);
      res.send([]);
    } else {
      res.json(users);
    }
  })

})

router.post('/users', async (req, res, next) => {
  let identification = new ObjectId(req.body._id)
  if (await User.find({_id: identification}).countDocuments() > 0) {
    req.user = await User.findById(req.body._id);
    next()
  }
  req.user = new User
  next()
}, createUpdateUser());

//https://stackoverflow.com/questions/54684258/why-are-documents-not-being-deleted-from-the-mongodb-database
router.delete('/users/:id', async (req, res) => {
  const identification =  new ObjectId(req.params.id)
  await User.deleteOne({'_id': identification}, function(err, res) {
    if (err) console.log(err)
  })
})

function createUpdateUser() {
  return async (req, res) => {
    let identification = new ObjectId(req.body._id)
    let user = req.user
    user.firstName = req.body.firstName
    user.lastName = req.body.lastName
    user.date = req.body.date
    user.time = req.body.time
    user.phoneNumber = req.body.phoneNumber
    user.email = req.body.email
    user.services = JSON.stringify(req.body.services)
    user.timestamp = req.body.timestamp
    user._id = identification

    try {
      user = await user.save()
    } catch (e) {
      console.log(e)
    }
  }
}


module.exports = router
