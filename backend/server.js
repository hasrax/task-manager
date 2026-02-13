const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const taskRoutes = require('./routes/taskRoutes');

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express
const app = express();

// ── Middleware ──────────────────────────
// Middleware = functions that run BEFORE your route handlers

app.use(cors());            // Allow frontend to make requests
app.use(express.json());    // Parse JSON data from requests

// ── Routes ─────────────────────────────
// Any request to /api/tasks will be handled by taskRoutes
app.use('/api/tasks', taskRoutes);

// Simple test route
app.get('/', (req, res) => {
    res.json({ message: '🚀 Task Manager API is running!' });
});

// ── Start Server ───────────────────────
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// ──────────────────────────────────────
// 📘 JS CONCEPT: require() & module.exports
// ──────────────────────────────────────
// Node.js splits code into FILES (modules).
//
// To SHARE code from one file:
//   module.exports = myFunction;
//
// To USE code from another file:
//   const myFunction = require('./myFile');
//
// Think of it like importing ingredients into a kitchen!
// ──────────────────────────────────────