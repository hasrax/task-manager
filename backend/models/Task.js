const mongoose = require('mongoose');

// A Schema is like a BLUEPRINT — it defines what a Task looks like
const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,       // The task title is text
            required: [true, 'Please add a task title'],  // Can't be empty
            trim: true          // Removes extra spaces
        },
        completed: {
            type: Boolean,      // true or false
            default: false      // New tasks start as "not completed"
        }
    },
    {
        timestamps: true  // Automatically adds createdAt & updatedAt fields
    }
);

// Export the model so other files can use it
module.exports = mongoose.model('Task', taskSchema);

// ──────────────────────────────────────
// 📘 JS CONCEPT: Objects & Key-Value Pairs
// ──────────────────────────────────────
// { title: "Buy groceries", completed: false }
//
// This is a JavaScript OBJECT. It stores data as key:value pairs.
//   - "title" is the KEY
//   - "Buy groceries" is the VALUE
//
// Almost everything in JavaScript is an object!
// MongoDB stores data as objects too (called "documents").
// ──────────────────────────────────────