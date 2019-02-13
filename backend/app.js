const express = require('express');

const app = express();

app.use('/api/posts', (req, res, next) => {
  const posts = [
    {
      id: 'fsdsdsd',
      title: 'First server message',
      content: 'Sample content 1'
    },
    {
      id: '2sdsdsd',
      title: 'Second server message',
      content: 'Sample content 2'
    }
  ];
  res.status(200).json({
    message:"Posts fetched successfully",
    posts: posts
  });
});

module.exports = app;
