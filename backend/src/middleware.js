// backend/src/middleware.js
const jwt = require('jsonwebtoken');
const { User } = require('./models');

const auth = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    console.log("middlewear",authHeader)

    if (!authHeader) {
      throw new Error('No authorization header found');
    }
    const token = authHeader.replace('Bearer ', '');
    console.log("middlewear",token)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded",decoded.id)
    const user = await User.findOne({ _id: decoded.id });
    console.log(user)
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
