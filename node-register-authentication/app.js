const express = require('express');
const app = express();

const expressEjsLayouts = require('express-ejs-layouts');

const mongoose = require('mongoose');

// db config
const db = require('./config/keys').MongoURI;

// connect to mongo db
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log('mongodb connected');
  })
  .catch((err) => console.log(err.message));

// ejs
app.use(expressEjsLayouts);
app.set('view engine', 'ejs');

// body parser
app.use(express.urlencoded({ extended: false }));

// routes - prodcuts
app.use('/', require('./routes/index'));

// routes - users
app.use('/users', require('./routes/users'));

// port
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`server started on ${PORT}`));
