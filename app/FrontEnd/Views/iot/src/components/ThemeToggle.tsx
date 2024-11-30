'use client';

import React, { useEffect, useState } from 'react';

// Função para detectar o tema atual no localStorage ou no sistema
const getInitialTheme = () => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        return savedTheme;
      }
      // Verifica se o navegador suporta 'matchMedia'
      if (window.matchMedia) {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
    }
    return 'light'; // Fallback padrão
  };
  

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<string>(getInitialTheme());

  // Alterar o tema
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme); // Salva no localStorage
  };

  // Aplica a classe no <body> para mudar o tema
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
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