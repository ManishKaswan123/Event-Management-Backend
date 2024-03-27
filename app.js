// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const eventCreatorRouter = require('./routes/events');
const eventFinderRouter = require('./routes/eventFinder');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://manishkaswan88:gJLrwn18LEN6qooi@cluster0.z3dh8rj.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000, // Example value, adjust as needed
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));


// Parse CSV file and save data to MongoDB
// fs.createReadStream('data.csv')
//     .pipe(csv())
//     .on('data', (row) => {
//         // Create a new MongoDB document for each row in the CSV file
//         const newEvent = new Event({
//             event_name: row.event_name,
//             city_name: row.city_name,
//             date: new Date(row.date),
//             time: row.time,
//             latitude: parseFloat(row.latitude),
//             longitude: parseFloat(row.longitude)
//         });
//         // Save the document to the database
//         newEvent.save();
//     })
//     .on('end', () => {
//         console.log('CSV file successfully processed');
//     });


// Routes
app.use('/api/events', eventCreatorRouter);
app.use('/api/events', eventFinderRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
