const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const User = require('../models/User');
const config = require('config');

// @route   GET api/auth
// @desc    Get LoggedIn user
// @access  Private

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'server error' });
  }
});

// @route   POST api/auth
// @desc    Login a user
// @access  Puplic

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: ' Invalid credentials ' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'invalid password' });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };
    jwt.sign(
      payload,
      config.get('jwtSecret'),
      {
        expiresIn: 36000,
      },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send('server error');
  }
});

module.exports = router;
