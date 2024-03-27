const express = require('express');
const router = express.Router();
const Event = require('../models/eventModel');
const axios = require('axios');

router.get('/find', async (req, res) => {
  const { latitude, longitude, date, page = 1 } = req.query;
  const pageSize = 10;

  try {
    // Calculate the end date (14 days from the specified date)
    const endDate = new Date(new Date(date).getTime() + 14 * 24 * 60 * 60 * 1000);

    // Query events count within the date range
    const totalEvents = await Event.countDocuments({
      date: { $gte: new Date(date), $lte: endDate }
    });

    // Calculate total pages
    const totalPages = Math.ceil(totalEvents / pageSize);

    // Initialize an array to store all events
    let allEvents = [];

    // Loop through each page and fetch events
    for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
      // Calculate skip value for pagination
      const skip = (currentPage - 1) * pageSize;

      // Fetch events for the current page
      const events = await Event.find({
        date: { $gte: new Date(date), $lte: endDate }
      })
      .sort({ date: 1 })
      .skip(skip)
      .limit(pageSize);

      // Make parallel calls to Weather API and Distance Calculation API for the events on this page
      const weatherPromises = events.map(event => axios.get(`https://gg-backend-assignment.azurewebsites.net/api/Weather?code=KfQnTWHJbg1giyB_Q9Ih3Xu3L9QOBDTuU5zwqVikZepCAzFut3rqsg==&city=${encodeURIComponent(event.cityName)}&date=${event.date}`));
      const distancePromises = events.map(event => axios.get(`https://gg-backend-assignment.azurewebsites.net/api/Distance?code=IAKvV2EvJa6Z6dEIUqqd7yGAu7IZ8gaH-a0QO6btjRc1AzFu8Y3IcQ==&latitude1=${latitude}&longitude1=${longitude}&latitude2=${event.latitude}&longitude2=${event.longitude}`));

      // Await all promises
      const [weatherResponses, distanceResponses] = await Promise.all([Promise.all(weatherPromises), Promise.all(distancePromises)]);

      // Combine event data with weather and distance information
      const eventData = events.map((event, index) => ({
        event_name: event.event_name,
        city_name: event.city_name,
        date: event.date,
        weather: weatherResponses[index].data.weather, // Adjust according to your weather API response structure
        distance_km: distanceResponses[index].data.distance, // Adjust according to your distance API response structure
      }));

      // Push events of current page to the array
      allEvents = allEvents.concat(eventData);
    }

    // Calculate start and end indexes for events on the requested page
    const startIndex = (page - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, totalEvents);

    // Extract events for the requested page
    const eventsOnPage = allEvents.slice(startIndex, endIndex);

    res.json({
      events: eventsOnPage,
      page: parseInt(page), // Return current page number
      pageSize: pageSize, // Page size is 10
      totalEvents: totalEvents, // Total events within the date range
      totalPages: totalPages // Total pages based on total events and page size
    });
  } catch (error) {
    console.error('Error finding events:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
