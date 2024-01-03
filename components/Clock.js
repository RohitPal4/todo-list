// components/Clock.js
"use client"
import React from 'react';

const Clock = ({ currentTime }) => {
  return (
    <div className="text-center text-2xl font-bold p-2 bg-sky-500 border-sky-500">
      Current Time: {currentTime.toLocaleTimeString()}
    </div>
  );
};

export default Clock;
