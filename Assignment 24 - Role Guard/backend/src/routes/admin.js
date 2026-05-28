const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { requireAuth, requireRole } = require('../middleware/auth');

router.get('/users', requireAuth, requireRole('ADMIN'), async (req, res) => {
  const users = await User.find({}, '-password');
  res.json({ users });
});

module.exports = router;
