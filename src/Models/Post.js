const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: String,
  sub_title: String,
  tags: String,
  content: String,
});

module.exports = mongoose.model('posts', PostSchema);
