const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('config');

// @route   POST api/users
// @desc    Register a new user 
// @access  Puplic

router.post('/', async (req, res) => {
    const { name, email, password } = req.body;

    try {
            
        let user = await User.findOne({ email });

        if(user){
            return res.status(400).json({ msg: " User Already Exists " })
        }

        user = new User({
            name,
            email,
            password
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save(); 

        const payload = {
            user:{
                id:user.id
            }
        }
        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn:36000 
        }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        })



    } catch (error) {
        console.error(error.message);
        res.status(500).send('server error');
    }
})

module.exports = router;