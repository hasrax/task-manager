import { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import FilterButtons from './components/FilterButtons';
import { getTasks, createTask, updateTask, deleteTask } from './api/taskApi';

function App() {
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('all');
    const [loading, setLoading] = useState(true);

    // ── Fetch tasks when the app loads ──
    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const data = await getTasks();
            setTasks(data);
        } catch (error) {
            console.error('Failed to fetch tasks:', error);
        } finally {
            setLoading(false);
        }
    };

    // ── Add a new task ──
    const handleAdd = async (title) => {
        try {
            const newTask = await createTask(title);
            setTasks([newTask, ...tasks]);  // Add to top of list
        } catch (error) {
            console.error('Failed to create task:', error);
        }
    };

    // ── Toggle complete/incomplete ──
    const handleToggle = async (id, currentStatus) => {
        try {
            const updated = await updateTask(id, { completed: !currentStatus });
            setTasks(tasks.map(t => t._id === id ? updated : t));
        } catch (error) {
            console.error('Failed to toggle task:', error);
        }
    };

    // ── Update task title ──
    const handleUpdate = async (id, updatedData) => {
        try {
            const updated = await updateTask(id, updatedData);
            setTasks(tasks.map(t => t._id === id ? updated : t));
        } catch (error) {
            console.error('Failed to update task:', error);
        }
    };

    // ── Delete a task ──
    const handleDelete = async (id) => {
        try {
            await deleteTask(id);
            setTasks(tasks.filter(t => t._id !== id));
        } catch (error) {
            console.error('Failed to delete task:', error);
        }
    };

    // ── Filter tasks based on selected filter ──
    const filteredTasks = tasks.filter(task => {
        if (filter === 'active') return !task.completed;
        if (filter === 'completed') return task.completed;
        return true;  // 'all' — show everything
    });

    if (loading) return <div className="loading">Loading tasks...</div>;

    return (
        <div className="app">
            <div className="container">
                <h1>📋 Task Manager</h1>
                <TaskForm onAdd={handleAdd} />
                <FilterButtons
                    filter={filter}
                    setFilter={setFilter}
                    taskCount={filteredTasks.length}
                />
                <TaskList
                    tasks={filteredTasks}
                    onToggle={handleToggle}
                    onDelete={handleDelete}
                    onUpdate={handleUpdate}
                />
            </div>
        </div>
    );
}

export default App;

// ──────────────────────────────────────
// 📘 REACT CONCEPT: useEffect
// ──────────────────────────────────────
// useEffect(() => {
//     fetchTasks();
// }, []);
//
// useEffect runs code AFTER the component renders.
// The empty array [] means "run this ONCE when the page loads."
//
// Think of it like:
//   "When this page opens for the first time, go fetch the tasks"
//
// Without [] → runs on EVERY re-render (usually bad)
// With []    → runs ONCE on mount (what we want)
// ──────────────────────────────────────

// ──────────────────────────────────────
// 📘 JS CONCEPT: .filter()
// ──────────────────────────────────────
// tasks.filter(t => t._id !== id)
//
// .filter() creates a NEW array with only items that
// pass the test.
//
// Example:
//   [1, 2, 3, 4, 5].filter(n => n > 3)  → [4, 5]
//
// For delete: we keep all tasks EXCEPT the one
// whose _id matches the deleted one.
// ──────────────────────────────────────

// ──────────────────────────────────────
// 📘 JS CONCEPT: Spread Operator (...)
// ──────────────────────────────────────
// [newTask, ...tasks]
//
// The three dots (...) "spread" an array out.
//
// If tasks = ["Task A", "Task B"]
// Then [newTask, ...tasks] = [newTask, "Task A", "Task B"]
//
// It adds the new task at the BEGINNING of the list.
// ──────────────────────────────────────