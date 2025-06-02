const express = require('express');
const router = express.Router();
const supabase = require('../supabase');
const requireAuth = require('../middeware/requireAuth');

// GET all events
router.get('/', async (req, res) => {
  const { data, error } = await supabase.from('events').select('*');
  if (error) return res.status(500).json({ error });
  res.json(data);
});

// CREATE event — requires auth
router.post('/', requireAuth, async (req, res) => {
  const { title, description, date, location } = req.body;
  const user_id = req.user.id;

  const { data, error } = await supabase
    .from('events')
    .insert([{ title, description, date, location, user_id }])
    .select();

  if (error) return res.status(400).json({ error });
  res.status(201).json(data[0]);
});

// UPDATE event — only if owned by user
router.patch('/:id', requireAuth, async (req, res) => {
  const { id } = req.params;
  const { title, description, date, location } = req.body;
  const user_id = req.user.id;

  const { data, error } = await supabase
    .from('events')
    .update({ title, description, date, location })
    .eq('id', id)
    .eq('user_id', user_id) 
    .select();

  if (error) return res.status(400).json({ error });
  if (data.length === 0) return res.status(403).json({ error: 'Not authorized to update this event.' });

  res.json(data[0]);
});

// DELETE event — only if owned by use
router.delete('/:id', requireAuth, async (req, res) => {
    const eventId = req.params.id;
    const userId = req.user.id;
  
    // verify ownership
    const { data: event, error: fetchError } = await supabase
      .from('events')
      .select('*')
      .eq('id', eventId)
      .eq('user_id', userId)
      .maybeSingle(); 
  
    if (fetchError) {
      return res.status(403).json({ error: 'Not authorized to delete this event.' });
    }
  
  //deletes
    const { error: deleteError } = await supabase
      .from('events')
      .delete()
      .eq('id', eventId);
  
    if (deleteError) {
      return res.status(500).json({ error: 'Failed to delete event.' });
    }
  
    res.status(204).send(); 
  });
  

module.exports = router;
