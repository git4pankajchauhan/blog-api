const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: String,
  subTitle: String,
  tags: String,
  description: String,
});

module.exports = mongoose.model('posts', PostSchema);
