const express = require('express');
const router = express.Router();
const supabase = require('../supabase');
const requireAuth = require('../middeware/requireAuth');


router.get('/', async (req, res) => {
  const { data, error } = await supabase.from('events').select('*');
  if (error) return res.status(500).json({ error });
  res.json(data);

});


// Create event — requires auth
router.post('/', requireAuth, async (req, res) => {
    const { title, description, date, location } = req.body;
    const user_id = req.user.id;

  
    const { data, error } = await supabase
      .from('events')
      .insert([{ title, description, date, location, user_id }]);
  
    if (error) {
      console.error('Supabase insert error:', error); // 👈 This is also important
      return res.status(400).json({ error });
    }
  
    res.status(201).json(data);
  });
  

module.exports = router;
