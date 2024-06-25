// backend/src/middleware.js
const jwt = require('jsonwebtoken');
const { User } = require('./models');

const auth = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header found');
    }
    const token = authHeader.replace('Bearer ', '');
    const decoded = jwt.verify(token, 'your_jwt_secret');
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

    if (!user) {
      throw new Error('User not found');
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

module.exports = auth;
