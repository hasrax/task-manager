import { useState } from 'react';

// This component shows an input field + button to add tasks
// "onAdd" is a function passed from the parent (App.jsx)
function TaskForm({ onAdd }) {
    const [title, setTitle] = useState('');

    // Runs when the form is submitted
    const handleSubmit = (e) => {
        e.preventDefault();  // Stop page from refreshing

        // Don't add empty tasks
        if (!title.trim()) return;

        onAdd(title);   // Call the parent's function to add the task
        setTitle('');    // Clear the input field
    };

    return (
        <form className="task-form" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="✍️ Add a new task..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <button type="submit">Add</button>
        </form>
    );
}

export default TaskForm;

// ──────────────────────────────────────
// 📘 REACT CONCEPT: useState
// ──────────────────────────────────────
// const [title, setTitle] = useState('');
//
// This creates a VARIABLE that React watches.
// When you call setTitle("new value"), React:
//   1. Updates the variable
//   2. Re-renders (redraws) the component
//
// Think of it like a whiteboard:
//   - title = what's written on the board
//   - setTitle = the eraser + marker to change it
//   - React sees the change and updates the screen
//
// useState('') means the starting value is an empty string
// ──────────────────────────────────────

// ──────────────────────────────────────
// 📘 REACT CONCEPT: Props
// ──────────────────────────────────────
// function TaskForm({ onAdd })
//
// "Props" are like ARGUMENTS you pass to a component.
// The parent (App.jsx) passes data DOWN to children.
//
// <TaskForm onAdd={handleAddTask} />
//            ↑ parent passes this function
//
// function TaskForm({ onAdd })
//                     ↑ child receives it here
//
// { onAdd } is destructuring (pulling onAdd out of props)
// ──────────────────────────────────────