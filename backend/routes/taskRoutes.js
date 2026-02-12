const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// ==========================================
//  📌 GET /api/tasks — Get ALL tasks
// ==========================================
router.get('/', async (req, res) => {
    try {
        // Find all tasks in the database, newest first
        const tasks = await Task.find().sort({ createdAt: -1 });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ==========================================
//  📌 POST /api/tasks — Create a NEW task
// ==========================================
router.post('/', async (req, res) => {
    try {
        // req.body contains the data sent from the frontend
        const { title } = req.body;

        if (!title) {
            return res.status(400).json({ message: 'Title is required' });
        }

        const task = await Task.create({ title });
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ==========================================
//  📌 PUT /api/tasks/:id — Update a task
// ==========================================
router.put('/:id', async (req, res) => {
    try {
        // req.params.id gets the :id from the URL
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Update the task with new data from req.body
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }  // Return the updated version, not the old one
        );

        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ==========================================
//  📌 DELETE /api/tasks/:id — Delete a task
// ==========================================
router.delete('/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        await Task.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Task deleted', id: req.params.id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;

// ──────────────────────────────────────
// 📘 JS CONCEPT: Destructuring
// ──────────────────────────────────────
// const { title } = req.body;
//
// This is the SAME as:
// const title = req.body.title;
//
// It's a shortcut to pull values out of objects.
// Super common in modern JavaScript!
// ──────────────────────────────────────

// ──────────────────────────────────────
// 📘 JS CONCEPT: HTTP Status Codes
// ──────────────────────────────────────
// 200 = OK (success)
// 201 = Created (new thing made)
// 400 = Bad Request (user sent wrong data)
// 404 = Not Found
// 500 = Server Error (something broke on our end)
// ──────────────────────────────────────