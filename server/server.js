const dotenv = require('dotenv');
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = require('./app');
const connectDB = require('./config/db');

// Log the MONGO_URI before loading environment variables
console.log('MONGO_URI before loading .env:', process.env.MONGO_URI);

// Load environment variables from .env file
const envPath = path.resolve(__dirname, '.env');
const envContent = fs.readFileSync(envPath, 'utf-8');
console.log('Content of .env file:', envContent);

dotenv.config({ path: envPath });

// Log the path to the .env file
console.log('dotenv config path:', envPath);

// Log the result of dotenv.config
console.log('dotenv loaded:', dotenv.config({ path: envPath }));

// Log the current working directory
console.log('Current working directory:', process.cwd());

// Log the Node.js version
console.log('Node.js version:', process.version);

// Log the file system to check if the .env file exists
console.log('Checking if .env file exists:', fs.existsSync(envPath));

// Log the environment variables
console.log('Environment variables loaded:', process.env);
console.log('MONGO_URI from server.js:', process.env.MONGO_URI);
console.log('MONGO_URI from process.env:', process.env.MONGO_URI);
console.log('All environment variables:', JSON.stringify(process.env, null, 2));

// Conditional check for MONGO_URI
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  console.error('MONGO_URI is not defined!');
  process.exit(1);
}

const PORT = process.env.PORT || 5000;

// Connect to the database
connectDB();

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
