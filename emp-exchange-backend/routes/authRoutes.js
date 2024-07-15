const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjusted the path to the User model
const router = express.Router();

// Signup route
router.post('/signup', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send('User already exists');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            email,
            password: hashedPassword,
        });

        await newUser.save();
        const token = jwt.sign({ id: newUser._id }, 'your_jwt_secret', { expiresIn: '1h' });
        res.status(201).json({ token, user: { email: newUser.email } });
    } catch (error) {
        res.status(500).send('Error creating user');
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send('Invalid credentials');
        }

        // Compare the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send('Invalid credentials');
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
        res.status(200).json({ token, user: { email: user.email } });
    } catch (error) {
        res.status(500).send('Error logging in');
    }
});

module.exports = router;
