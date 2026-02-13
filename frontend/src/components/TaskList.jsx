import TaskItem from './TaskItem';

function TaskList({ tasks, onToggle, onDelete, onUpdate }) {
    if (tasks.length === 0) {
        return <p className="no-tasks">No tasks yet! Add one above ☝️</p>;
    }

    return (
        <div className="task-list">
            {tasks.map((task) => (
                <TaskItem
                    key={task._id}
                    task={task}
                    onToggle={onToggle}
                    onDelete={onDelete}
                    onUpdate={onUpdate}
                />
            ))}
        </div>
    );
}

export default TaskList;

// ──────────────────────────────────────
// 📘 JS CONCEPT: .map()
// ──────────────────────────────────────
// tasks.map((task) => <TaskItem ... />)
//
// .map() loops through an array and TRANSFORMS each item.
//
// Example:
//   [1, 2, 3].map(num => num * 2)  → [2, 4, 6]
//
// In React, we use .map() to turn an ARRAY OF DATA
// into an ARRAY OF COMPONENTS.
//
// Each task object → becomes a <TaskItem /> component
// ──────────────────────────────────────

// ──────────────────────────────────────
// 📘 REACT CONCEPT: key={task._id}
// ──────────────────────────────────────
// When rendering lists, React needs a UNIQUE "key"
// for each item so it can track which items changed.
//
// MongoDB gives every document a unique "_id"
// So we use that as our key!
// ──────────────────────────────────────