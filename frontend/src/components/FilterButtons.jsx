function FilterButtons({ filter, setFilter, taskCount }) {
    return (
        <div className="filter-bar">
            <div className="filter-buttons">
                <button
                    className={filter === 'all' ? 'active' : ''}
                    onClick={() => setFilter('all')}
                >
                    All
                </button>
                <button
                    className={filter === 'active' ? 'active' : ''}
                    onClick={() => setFilter('active')}
                >
                    Active
                </button>
                <button
                    className={filter === 'completed' ? 'active' : ''}
                    onClick={() => setFilter('completed')}
                >
                    Completed
                </button>
            </div>
            <span className="task-count">{taskCount} tasks</span>
        </div>
    );
}

export default FilterButtons;