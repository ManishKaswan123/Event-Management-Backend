const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    event_name: {
        type: String,
        required: true
    },
    city_name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Event', eventSchema);
