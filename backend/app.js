const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Post = require('./models/post');
const app = express();

mongoose
  .connect(
    'mongodb+srv://meanblog:Lhbr00ULDvSGw3Bl@meanblog-l4ouc.mongodb.net/test?retryWrites=true',
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log('Connected to Database!');
  })
  .catch(() => {
    console.log('Connection failed!');
  });

/**
 * meanblog
 * Lhbr00ULDvSGw3Bl
 */
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
  );
  next();
});

app.post('/api/posts', (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save();
  console.log(post);

  res.status(201).json({
    message: 'Evereything was okay!'
  });
});

app.get('/api/posts', (req, res, next) => {
  const posts = {};
  Post.find().then(documents => {
    res.status(200).json({
      message: 'Posts fetched successfully',
      posts: documents
    });
  });
});

module.exports = app;
