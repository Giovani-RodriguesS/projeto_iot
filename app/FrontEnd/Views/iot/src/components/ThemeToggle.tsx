'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import 'primeicons/primeicons.css';

export default function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const currentTheme = localStorage.getItem('theme') === 'dark';
    setIsDarkMode(currentTheme);
    document.documentElement.classList.toggle('dark', currentTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    document.documentElement.classList.toggle('dark', newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');

    // Recarrega a página para aplicar o tema corretamente sem erro de hidratação
    router.refresh();
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 bg-gray-200 dark:bg-gray-800 rounded-full text-xl text-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 transition"
      aria-label="Toggle Theme"
    >
      <i className={`pi ${isDarkMode ? 'pi-moon' : 'pi-sun'}`}></i>
    </button>
  );
}
