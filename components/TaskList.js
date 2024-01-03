
"use client"
import React from 'react';

const TaskList = ({ sortedTasks, deleteHandler }) => {
  let renderTask = <h2>No Task Available</h2>;

  if (sortedTasks.length > 0) {
    renderTask = sortedTasks.map((task, i) => (
      <li key={i} className="flex items-center justify-between mb-8">
        <div className="flex justify-between mb-5 w-2/3">
          <h5 className="text-xl font-semibold">{task.title}</h5>
          <h6 className="text-lg font-medium">{task.desc}</h6>
          <p className="text-lg">{task.time}</p>
        </div>
        <button
          onClick={() => {
            deleteHandler(i);
          }}
          className="bg-red-500 text-white px-4 py-2 rounded font-bold"
        >
          Delete
        </button>
      </li>
    ));
  }

  return <ul>{renderTask}</ul>;
};

export default TaskList;
