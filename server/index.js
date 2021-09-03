'use strict';

const express = require('express');
const path = require('path');
const app = express();
const jwt = require('jsonwebtoken')

// Lets us get the data from a POST
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

// Adds headers
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', false);

  // Pass to next layer of middleware
  next();
});

var apiRouter = require('./api')
app.use('/api', apiRouter);

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

app.get('/api', (req, res) => {
  res.json({
    message: 'yo'
  })
})

app.post('/api/posts', verifyToken,  (req, res) => {
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

app.post('/api/login', (req, res) => {
  //test user
  const user = {
    username: req.body.username,
    password: req.body.password
  }
  jwt.sign({user}, 'secretkey', (err, token) => {
    res.json({
      token
    })
  });
})

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public/index.html'));
});

//Choose our port and launch the server
let PORT = process.env.PORT || 8999;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
