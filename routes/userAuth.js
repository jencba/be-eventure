const express = require('express');
const supabase = require('../supabase');
const router = express.Router();

// Signup
router.post('/signup', async (req, res) => {

  const { email, password } = req.body;
  const { data, error } = await supabase.auth.signUp({ email, password });
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


if (!email || !emailRegex.test(email)) {
  return res.status(400).json({ error: 'Invalid email format' });
}

  if (error) return res.status(400).json({ error: error.message });
  res.status(200).json({ message: 'Signup successful', data });
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) return res.status(400).json({ error: error.message });
  res.status(200).json({ message: 'Login successful', data });
});

module.exports = router;
