// backend/routes/eventCreator.js

const express = require('express');
const router = express.Router();
const Event = require('../models/eventModel'); // Import the Event model

// POST endpoint to add events
router.post('/', async (req, res) => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
