const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');

const User = require('../models/User');
const Post = require('../models/Post');

// @route   GET api/posts
// @desc    Get all posts in the database
// @access  public

router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'server error' });
  }
});

// @route   GET api/posts/user
// @desc    Get specific user posts
// @access  private

router.get('/user', auth, async (req, res) => {
  try {
    const userPosts = await Post.find({ user: req.user.id }).sort({ date: -1 });
    res.json(userPosts);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'server error' });
  }
});

// @route   POST api/posts/
// @desc    Add a new post
// @access  private

router.post('/', auth, async (req, res) => {
  const { title, content } = req.body;
  const id = req.user.id;
  try {
    const newPost = Post({
      title,
      content,
      user: id,
    });
    const post = await newPost.save();
    res.json(post);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'server error' });
  }
});

// @route    PUT api/contacts/:id
// @desc     Update a contact
// @access   Private
router.put('/:id', auth, async (req, res) => {
  const { title, content } = req.body;

  // Build contact object
  const postFields = {};
  if (title) postFields.title = title;
  if (content) postFields.content = content;

  try {
    let post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ msg: 'Contact not found' });

    // Make sure user owns contact
    if (post.user.toString() !== req.user.id)
      return res.status(401).json({ msg: 'Not authorized' });

    post = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: postFields },
      { new: true }
    );

    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route    DELETE api/contacts/:id
// @desc     Delete a contact
// @access   Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ msg: 'Contact not found' });

    // Make sure user owns contact
    if (post.user.toString() !== req.user.id)
      return res.status(401).json({ msg: 'Not authorized' });

    await Post.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Contact removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
