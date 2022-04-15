const express = require('express');
const router = express.Router();

const articles = [
  {
    title: 'test articles',
    createdAt: new Date(),
    description: 'test description',
  },
];
console.log(articles);

// routes
router.get('/', (req, res) => {
  res.render('articles', { articles: articles });
});

router.post('/', (req, res) => {
  // articles.push(req.body);
  console.log(req.body);
  res.redirect('/articles');
});

module.exports = router;
