const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function registerUser(req, res) {
    try {
      const { username, password } = req.body;
      const user = new User({ username, password });
      await user.save();
      res.status(201).send('User registered successfully.');
    } catch (error) {
      res.status(400).send('Registration failed.');
    }
  }

  async function loginUser(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        throw new Error('User not found');
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error('Invalid password');
      }
      const token = jwt.sign({ userId: user._id }, 'secret-key', {
        expiresIn: '3h',
      });
      res.json({ token });
    } catch (error) {
      res.status(401).send('Authentication failed.');
    }
  }

  module.exports = { registerUser, loginUser };
