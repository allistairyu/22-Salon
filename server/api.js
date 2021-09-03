// Express router for our API.
// Every URL starting with /api/ will be directed here
// This is a basic CRUD API for our Users MongoDB database

require('dotenv').config()

const express = require('express');
const ObjectId = require('mongodb').ObjectId;
const router = express.Router();  // get an instance of the express Router
const nodemailer = require('nodemailer')
const client = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_KEY)

let servicesDict = {
  'mensHaircut': ["Men's Haircut", 15],
  'womensHaircut': ["Women's Haircut", 20],
  'seniorKids': ["Seniors & Kids 11 and Under", 12],
  'beardTrim': ["Beard Trim", 5],
  'permAndColor': ["Perm & Color Start", 60],
  'styleStart': ["Style Starting", 25]
}

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
  }
})

let mongoose = require('mongoose');
mongoose.connect(process.env.MONGOOSE_CONNECT_STRING, { useNewUrlParser: true, useUnifiedTopology: true });

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
  User.find({date: req.params.date}, (err, users) => { 
    if (err) {
      console.log(err);
      res.send([]);
    } else {
      res.json(users);
    }
  })

})

const mapServices = (services) => {
  return services.map(service => {
    servicesDict[service][0] + '\n'
  })
}

router.post('/users', async (req, res, next) => {
  let identification = new ObjectId(req.body._id)
  if (await User.find({_id: identification}).countDocuments() > 0) {
    req.user = await User.findById(req.body._id);
    next()
    // createUpdateUser()
    // return
  }
  req.user = new User
  next()

  sendEmail(req, res)
  sendText(req, res)

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

const sendEmail = (req, res) => {
  let mailOptions = {
    from: '22salontestemail@gmail.com',
    to: req.body.email,
    subject: 'Hey ' + req.body.firstName + ', your appointment is confirmed',
    html: `<div style={{text-align: "center"}}><p><b>Hey ${req.body.firstName}, your appointment is confirmed</b></p>
            <p>Upcoming appointment:</p>
            <p>Confirmation code: ${req.body._id}</p>
            <p>Client: ${req.body.firstName} ${req.body.lastName.charAt(0)}.</p>
            <p>Service${req.body.services.length > 1 ? 's' : ''}: ${mapServices(req.body.services)}</p>
            <p>Time: ${req.body.date} at ${req.body.time}</p>
            <p><a href="google.com">Edit or Cancel appointment</a></p>
            <p><b>See you soon!</b></p>
            <p></p></div>`
  }
  // service(s)?
  //TODO: link?

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response)
    }
  })
}

const sendText = async (req, res) => {
  // WON'T WORK WITH UNVERIFIED PHONE NUMBERS FOR NOW...
  try {
    await client.messages.create({
      body: `Hey ${req.body.firstName}, your appointment at ${req.body.time} on ${req.body.date} is confirmed! \n~See you soon~`,
      from: process.env.TWILIO_NUMBER,
      to: req.body.phoneNumber
    })
    console.log('SMS sent')
  } catch (e) {
    console.log(e)
  }
}

module.exports = router
