// ThemeToggle.tsx
'use client';

import React, { useEffect, useState } from 'react';

const getInitialTheme = () => {
  if (typeof window !== 'undefined') {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme;
    if (window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
  }
  return 'light';
};

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<string>(getInitialTheme());

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <button
      className="p-2 bg-gray-300 dark:bg-gray-600 rounded-md text-black dark:text-white"
      onClick={toggleTheme}
    >
      {theme === 'dark' ? 'Modo Claro' : 'Modo Escuro'}
    </button>
  );
};

export default ThemeToggle;
