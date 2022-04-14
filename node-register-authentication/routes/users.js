const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

// user modal
const User = require('../model/User');

// login page
router.get('/login', (req, res) => {
  res.render('login');
});

// register page
router.get('/register', (req, res) => {
  res.render('register');
});

// register
router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body;

  let errors = [];

  // check required fields
  if (!name || !email || !password || !password2) {
    errors.push('please fill in all fields');
  }

  // check password confirm
  if (password !== password2) {
    errors.push('passwords are not the same');
  }

  if (errors.length > 0) {
    res.send('errors, try again');
  } else {
    // save user on db
    const newUser = new User({ name, email, password });
    newUser.save();

    // redirect to login page
    res.render('login');
  }
});

module.exports = router;
