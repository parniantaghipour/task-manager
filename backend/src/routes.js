const express = require('express');
const { User, Task } = require('./models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('./middleware');
const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    console.log("hereeee")
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();

    // Generate a token
    const token = jwt.sign({ user: { id: user._id } }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    res.status(201).json({ token });
  } catch (err) {
    res.status(500).send('Server error');
  }
});
// Register user
// router.post('/register', async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     // Check if user already exists
//     let user = await User.findOne({ username });
//     console.log("user", user)
//     if (user) {
//       return res.status(400).json({ msg: 'User already exists' });
//     }

//     // Create a new user
//     user = new User({ username, password });
//     await user.save();

//     // Generate JWT
//     const payload = { user: { id: user.id } };
//     jwt.sign(payload, 'your_jwt_secret', { expiresIn: '1h' }, (err, token) => {
//       if (err) throw err;
//       res.status(201).json({ token });
//     });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// });

// Login user
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(400).send({ error: 'Invalid login credentials' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.send({ user, token });
  } catch (e) {
    res.status(500).send(e);
  }
});

// Create task
router.post('/tasks', auth, async (req, res) => {
  try {
    const task = new Task({ ...req.body, userId: req.user._id });
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Get tasks
router.get('/tasks', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user._id });
    res.send(tasks);
  } catch (e) {
    res.status(500).send(e);
  }
});

// Update task
router.patch('/tasks/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, userId: req.user._id });
    if (!task) {
      return res.status(404).send();
    }
    Object.assign(task, req.body);
    await task.save();
    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Delete task
router.delete('/tasks/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
