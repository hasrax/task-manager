const mongoose = require('mongoose');

// This function connects our app to MongoDB
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);

        // Exit the process if DB connection fails
        process.exit(1);
    }
};

module.exports = connectDB;

// ──────────────────────────────────────
// 📘 JS CONCEPT: async/await
// ──────────────────────────────────────
// Connecting to a database takes time (it's over the internet).
// "async/await" lets us WAIT for it to finish before moving on.
//
// Think of it like ordering food:
//   - You ORDER (call the function)
//   - You WAIT (await) for it to arrive
//   - Then you EAT (use the result)
//
// Without await, JavaScript would move to the next line
// before the connection is ready — causing errors!
// ──────────────────────────────────────