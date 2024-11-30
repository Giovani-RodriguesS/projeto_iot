'use client';
import { useEffect, useState } from 'react';
import ThemeToggle from '@/components/ThemeToggle';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-4xl font-bold mb-4">Tema Claro e Escuro com React e TailwindCSS</h1>
        <p className="mb-4">Este é um exemplo simples de alternância entre temas.</p>
        <ThemeToggle />
      </div>
    </div>
  );
};

export default App;