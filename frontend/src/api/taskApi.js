import axios from 'axios';

// Base URL of our backend API
const API_URL = 'http://localhost:5000/api/tasks';

// ── GET all tasks ──────────────────────
export const getTasks = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

// ── POST (create) a new task ───────────
export const createTask = async (title) => {
    const response = await axios.post(API_URL, { title });
    return response.data;
};

// ── PUT (update) a task ────────────────
export const updateTask = async (id, updatedData) => {
    const response = await axios.put(`${API_URL}/${id}`, updatedData);
    return response.data;
};

// ── DELETE a task ──────────────────────
export const deleteTask = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};

// ──────────────────────────────────────
// 📘 JS CONCEPT: Arrow Functions
// ──────────────────────────────────────
// const getTasks = async () => { ... }
//
// This is the SAME as:
// async function getTasks() { ... }
//
// Arrow functions (=>) are just a shorter way to write functions.
// You'll see them EVERYWHERE in React!
//
// Examples:
//   const add = (a, b) => a + b;
//   const greet = (name) => `Hello ${name}`;
// ──────────────────────────────────────

// ──────────────────────────────────────
// 📘 JS CONCEPT: Template Literals
// ──────────────────────────────────────
// `${API_URL}/${id}`
//
// The backticks (`) let you INSERT variables into strings
// using ${variable}
//
// Instead of: API_URL + "/" + id    (ugly, old way)
// We write:   `${API_URL}/${id}`    (clean, modern way)
// ──────────────────────────────────────