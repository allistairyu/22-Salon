// Express router for our API.
// Every URL starting with /api/ will be directed here
// This is a basic CRUD API for our Users MongoDB database

require('dotenv').config()

const express = require('express');
const ObjectId = require('mongodb').ObjectId;
const router = express.Router();  // get an instance of the express Router
const nodemailer = require('nodemailer')
const client = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_KEY)
const jwt = require('jsonwebtoken')
const bcrypt = require("bcryptjs");
const SALT_WORK_FACTOR = 10

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

//Define our schema for appointments
let Appointment = mongoose.model('Appointment', {
  firstName: String,
  lastName: String,
  date: String,
  time: String,
  email: String,
  phoneNumber: String,
  services: [String],
  timestamp: String
}, 'Appointment');

let User = mongoose.model('User', {
  username: String,
  password: String,
  admin: Boolean
}, 'User')

User.find((err, users) => {
  if(users.length == 0) {
    var testUsers = [
      { username: 'test-admin', password: '12345' }
    ];

    User.collection.insert(testUsers, (err, users) => { if (err) console.log(err); });
  }
});

const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403)
  }
}

router.get('/', (req, res) => {
  res.json({
    message: 'yo'
  })
})

router.post('/posts', verifyToken,  (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: 'post created',
        authData
      })
    }
  })
  
})

router.post('/login', (req, res) => {
  User.findOne({username: req.body.username})
    .then(user => {
      if (!user) res.sendStatus(204)
      else {
        bcrypt.compare(req.body.password, user.password)
      }
    }).then(user => jwt.sign({user}, 'secretkey', (err, token) => {
      res.json({
        token,
        username: req.body.username
      })
    }))
  
})

router.post('/register', async (req, res) => {
  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  const hash = await bcrypt.hash(req.body.password, salt)
  let user = new User({
    username: req.body.username,
    password: hash,
    salt: salt,
    admin: false
  })
  try {
    user.save()
  } catch (e) {
    console.log(e)
  }
})


//Routed to GET /api/appointments
router.get('/appointments', (req, res) => {
  Appointment.find((err, appointments) => {
    if (err) {
      console.log(err);
      res.send([]);
    } else {
      res.json(appointments);
    }
  });
});

//get all appointments on certain date AND
//get appointment by id
router.get('/appointments/:param', (req, res) => {
  //TODO: find better way to differentiate date from id
  if (req.params.param.substr(-4) === '2021') {
    Appointment.find({date: req.params.param}, (err, appointments) => { 
      if (err) {
        console.log(err);
        res.send([]);
      } else {
        res.json(appointments);
      }
    })
  } else {
    const identification = new ObjectId(req.params.param)
    Appointment.find({_id: identification}, (err, appointment) => {
      if (err) console.log(err)
      else {
        res.json(appointment)
      }
    })
  }
})

const mapServices = (services) => {
  return services.map(service => {
    servicesDict[service][0] + '\n'
  })
}

router.post('/appointments', async (req, res, next) => {
  let identification = new ObjectId(req.body._id)
  if (await Appointment.find({_id: identification}).countDocuments() > 0) {
    req.appointment = await Appointment.findById(req.body._id);
    next()
  }
  req.appointment = new Appointment
  next()

  sendEmail(req, res)
  sendText(req, res)

}, createUpdateAppointment());

//https://stackoverflow.com/questions/54684258/why-are-documents-not-being-deleted-from-the-mongodb-database
router.delete('/appointments/:id', async (req, res) => {
  const identification =  new ObjectId(req.params.id)
  await Appointment.deleteOne({'_id': identification}, function(err, res) {
    if (err) console.log(err)
  })
})

function createUpdateAppointment() {
  return async (req, res) => {
    let identification = new ObjectId(req.body._id)
    let appointment = req.appointment
    appointment.firstName = req.body.firstName
    appointment.lastName = req.body.lastName
    appointment.date = req.body.date
    appointment.time = req.body.time
    appointment.phoneNumber = req.body.phoneNumber
    appointment.email = req.body.email
    appointment.services = JSON.stringify(req.body.services)
    appointment.timestamp = req.body.timestamp
    appointment._id = identification
    res.json([])
    try {
      appointment = await appointment.save()
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
