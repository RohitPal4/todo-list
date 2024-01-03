// components/TaskForm.js
"use client"
import React from 'react';

const TaskForm = ({
  title,
  desc,
  hour,
  minute,
  period,
  setTitle,
  setDesc,
  setHour,
  setMinute,
  setPeriod,
  submitHandler,
}) => {
  return (
    <form onSubmit={submitHandler} className="flex flex-wrap items-center justify-center bg-lime-500">
      <label htmlFor="title" className="sr-only">
        Enter Title
      </label>
      <input
        type="text"
        id="title"
        className="text-2xl border border-gray-800 m-2 px-4 py-2"
        placeholder="Enter Title?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label htmlFor="description" className="sr-only">
        Description
      </label>
      <input
        type="text"
        id="description"
        className="text-2xl border border-gray-800 m-2 px-4 py-2"
        placeholder="Description?"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />

      <div className="flex justify-center ">
        <div className="scrollable-container">
          <input
            type="number"
            className="text-2xl border border-gray-800 m-2 px-4 py-2"
            value={hour}
            min="1"
            max="12"
            onChange={(e) => setHour(e.target.value)}
          />
        </div>

        <span className="text-2xl">:</span>

        <input
          type="number"
          className="text-2xl border border-gray-800 m-2 px-4 py-2"
          value={minute}
          min="0"
          max="59"
          onChange={(e) => setMinute(e.target.value)}
        />

        <select
          className="text-2xl border border-gray-800 m-2 px-4 py-2"
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
        >
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
      </div>
      <button
        type="submit"
        className="bg-black text-white m-2 px-4 py-3 text-2xl font-bold rounded"
      >
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
