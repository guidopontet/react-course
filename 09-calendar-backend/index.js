const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

require('dotenv').config();

const app = express();

// Database
dbConnection();

// CORS
app.use(cors());

// Public
app.use(express.static('public'));

// Middlewares
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
