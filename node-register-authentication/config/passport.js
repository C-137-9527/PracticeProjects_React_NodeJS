const localStrategy = require('passport-local').Strategy;

const mongoose = require('mongoose');

// load User Modal
module.exports = (passport) => {
  passport.use(
    new localStrategy({ usernameField: 'email' }, (email, password, done) => {})
  );
};
