const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');

// GET /api/feedback - list all feedback
router.get('/', async (req, res) => {
  try {
    const items = await Feedback.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/feedback/:id - get one
router.get('/:id', async (req, res) => {
  try {
    const item = await Feedback.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
  } catch (err) {
    res.status(400).json({ error: 'Invalid id' });
  }
});

// POST /api/feedback - create
router.post('/', async (req, res) => {
  try {
    const { text, rating } = req.body;
    if (!text || rating === undefined) {
      return res.status(400).json({ error: 'text and rating are required' });
    }
    const fb = new Feedback({ text, rating });
    const saved = await fb.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /api/feedback/:id - update
router.put('/:id', async (req, res) => {
  try {
    const { text, rating } = req.body;
    const updated = await Feedback.findByIdAndUpdate(
      req.params.id,
      { text, rating },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ error: 'Not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: 'Invalid request' });
  }
});

// DELETE /api/feedback/:id - remove
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Feedback.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: 'Invalid id' });
  }
});

module.exports = router;
