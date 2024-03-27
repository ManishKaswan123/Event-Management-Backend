# Event Finder

The Event Finder is a RESTful API endpoint designed to list events based on the user's latitude, longitude, and a specified date. It provides users with event information, including event name, city, date, weather, and distance from the user's location. The system returns events occurring within the next 14 days from the specified date and supports pagination.

## Approach Overview

The Event Finder system follows a microservice architecture, leveraging Node.js for the backend server, MongoDB for data storage, and external APIs for weather information and distance calculations. The system's core functionality includes querying events based on user-provided parameters, integrating weather data for event locations, and calculating distances between the user's location and event venues.

## Tech Stack Choices

- **Node.js**: Chosen for its non-blocking, event-driven architecture, which is well-suited for handling asynchronous operations like HTTP requests and database queries.
- **Express.js**: Used as the web application framework for Node.js, providing robust routing, middleware, and HTTP utility methods.
- **MongoDB**: A NoSQL database chosen for its flexibility and scalability, allowing seamless storage and retrieval of event data.
- **Axios**: A promise-based HTTP client used for making HTTP requests to external APIs.
- **Mongoose**: An Object Data Modeling (ODM) library for MongoDB and Node.js, providing a straightforward schema-based solution for modeling application data.

## Getting Started

### Installation

1. Clone the repository:

git clone https://github.com/your-username/event-finder.git

2. Install dependencies:

cd event-finder
npm install


3. Set up environment variables:

Create a `.env` file in the root directory and define the following variables:

PORT=3000
MONGODB_URI='mongodb+srv://manishkaswan88:gJLrwn18LEN6qooi@cluster0.z3dh8rj.mongodb.net/'


### Run the Server

Start the server:

npm start


## Usage

### Endpoints

- **GET /events/find**: List events based on user's latitude, longitude, and date.

  Parameters:
  - `latitude`: Latitude of the user's location.
  - `longitude`: Longitude of the user's location.
  - `date`: Date in YYYY-MM-DD format.
  - `page`: (Optional) Page number for pagination.

### Sample Request

GET /events/find?latitude=40.7128&longitude=-74.0060&date=2024-03-15&page=1


### Sample Response

{
"events": [
{
"event_name": "Party development available",
"city_name": "Port Alexander",
"date": "2024-03-15",
"weather": "Sunny, 18C",
"distance_km": "12082.12940593859"
},
// Other events...
],
"page": 1,
"pageSize": 10,
"totalEvents": 44,
"totalPages": 5
}


## Contributing

Contributions are welcome! Feel free to submit bug reports, feature requests, or pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
