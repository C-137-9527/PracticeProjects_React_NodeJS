// MODULES
const express = require('express');
const app = express();
const Router = require('./routes/task');
const connectDB = require('./db/connect');
require('dotenv').config();

// MIDDLEWARE
app.use(express.json());

// ROUTE
app.use('/api/v1/tasks', Router);

app.use('*', (req, res) => {
  res.status(404).json('page not found');
});

// DB AND PORT
connectDB(process.env.MONGO_URI)
  .then(() => {
    app.listen(3000, () => {
      console.log('listening on port: 3000');
    });
  })
  .catch(() => console.log('FAIL TO CONNECT TO DB'));
