const dotenv = require('dotenv');
const express = require('express');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');

// Load environment variables from .env file
const envPath = path.resolve(__dirname, '.env');
if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
    console.log('Environment variables loaded from .env file');
} else {
    console.error('.env file not found!');
    process.exit(1);
}

// Log the MONGO_URI
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
    console.error('MONGO_URI is not defined!');
    process.exit(1);
} else {
    console.log('MONGO_URI:', mongoUri);
}

// Connect to MongoDB
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });

// Create an Express application
const app = express();
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});