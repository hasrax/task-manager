import { useState } from 'react';
import { FaTrash, FaEdit, FaCheck, FaTimes } from 'react-icons/fa';

function TaskItem({ task, onToggle, onDelete, onUpdate }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(task.title);

    // Save the edited title
    const handleSave = () => {
        if (!editTitle.trim()) return;
        onUpdate(task._id, { title: editTitle });
        setIsEditing(false);
    };

    // Cancel editing
    const handleCancel = () => {
        setEditTitle(task.title);  // Reset to original
        setIsEditing(false);
    };

    return (
        <div className={`task-item ${task.completed ? 'completed' : ''}`}>
            {isEditing ? (
                // ── EDITING MODE ──
                <div className="edit-mode">
                    <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                    />
                    <div className="edit-buttons">
                        <button className="save-btn" onClick={handleSave}>
                            <FaCheck />
                        </button>
                        <button className="cancel-btn" onClick={handleCancel}>
                            <FaTimes />
                        </button>
                    </div>
                </div>
            ) : (
                // ── DISPLAY MODE ──
                <div className="display-mode">
                    <div className="task-left" onClick={() => onToggle(task._id, task.completed)}>
                        <span className={`checkbox ${task.completed ? 'checked' : ''}`}>
                            {task.completed && <FaCheck />}
                        </span>
                        <span className="task-title">{task.title}</span>
                    </div>
                    <div className="task-buttons">
                        <button className="edit-btn" onClick={() => setIsEditing(true)}>
                            <FaEdit />
                        </button>
                        <button className="delete-btn" onClick={() => onDelete(task._id)}>
                            <FaTrash />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TaskItem;

// ──────────────────────────────────────
// 📘 REACT CONCEPT: Conditional Rendering
// ──────────────────────────────────────
// {isEditing ? (<EditMode />) : (<DisplayMode />)}
//
// This is a TERNARY OPERATOR — a short if/else:
//   condition ? (if true) : (if false)
//
// If isEditing is true  → show the edit input
// If isEditing is false → show the normal task view
// ──────────────────────────────────────

// ──────────────────────────────────────
// 📘 JS CONCEPT: && (Short Circuit)
// ──────────────────────────────────────
// {task.completed && <FaCheck />}
//
// If task.completed is TRUE → show the checkmark icon
// If task.completed is FALSE → show nothing
//
// It's a shortcut for:
//   if (task.completed) { show <FaCheck /> }
// ──────────────────────────────────────