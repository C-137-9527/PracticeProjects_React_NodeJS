const express = require('express');
const app = express();
const mongoose = require('mongoose');

// db
const db =
  'mongodb+srv://admin:admin@cluster0.kjnbp.mongodb.net/blog?retryWrites=true&w=majority';
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('db connected'))
  .catch((err) => console.log(err.message));

// routers
const articlesRouter = require('./routes/articles');
const articleRouter = require('./routes/article');

// view
app.set('view engine', 'ejs');

// routes - home
app.get('/', (req, res) => {
  res.send('home');
});
// routes - articles
app.use('/articles', articlesRouter);
// routes - article
app.use('/article', articleRouter);

// port
app.listen(5001, () => console.log('server started'));
