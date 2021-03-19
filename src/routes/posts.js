const express = require('express');
const Router = express.Router();
const Post = require('../Models/Post');

// Get All Post
Router.get('/', async (req, res) => {
  try {
    const postdata = await Post.find();
    res.status(200).json(postdata);
  } catch (error) {
    res.status(400).json({ message: `caught the error: ${error}`, status: false });
  }
});

// Get Single Post by id
Router.get('/getsingle/:id', async (req, res) => {
  try {
    const postdata = await Post.findById(req.params.id);
    res.status(200).json(postdata);
  } catch (error) {
    res.status(400).json({ message: `caught the error: ${error}`, status: false });
  }
});

// SEARCH
Router.get('/:tag', async (req, res) => {
  try {
    const regex = new RegExp(req.params.tag, 'i');
    const postdata = await Post.aggregate([{ $match: { tags: regex } }]);
    res.status(200).json(postdata);
  } catch (error) {
    res.status(400).json({ message: `caught the error: ${error}`, status: false });
  }
});

// INSERT
Router.post('/', async (req, res) => {
  try {
    const postdata = new Post({
      title: req.body.title,
      sub_title: req.body.sub_title,
      tags: req.body.tags,
      content: req.body.content,
    });
    await postdata.save();
    res.status(201).json({ message: 'Post Added Successfully', status: true });
  } catch (error) {
    res.status(400).json({ message: `caught the error: ${error}`, status: false });
  }
});

// UPDATE
Router.patch('/:id', async (req, res) => {
  try {
    await Post.updateOne(
      { _id: req.params.id },
      {
        $set: {
          title: req.body.title,
          sub_title: req.body.sub_title,
          tags: req.body.tags,
          content: req.body.content,
        },
      }
    );
    res.status(200).json({ message: 'Post Updated Successfully', status: true });
  } catch (error) {
    res.status(400).json({ message: `caught the error: ${error}`, status: false });
  }
});

// DELETE
Router.delete('/:id', async (req, res) => {
  try {
    await Post.remove({ _id: req.params.id });
    res.status(200).json({ message: 'Post Deleted Successfully', status: true });
  } catch (error) {
    res.status(400).json({ message: `caught the error: ${error}`, status: false });
  }
});

module.exports = Router;
