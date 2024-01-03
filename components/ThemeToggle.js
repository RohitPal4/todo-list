// components/ThemeToggle.js
"use client"
import React from 'react';

const ThemeToggle = ({ theme, toggleTheme }) => (
  <button className="toggle-button" onClick={toggleTheme}>
    {theme === 'light' ? '🌙' : '☀️'}
  </button>
);

export default ThemeToggle;
