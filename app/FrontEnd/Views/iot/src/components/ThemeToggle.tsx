'use client'; 
import React, { useState, useEffect } from 'react'; 
import { useRouter } from 'next/navigation'; 
import 'primeicons/primeicons.css'; 


export default function ThemeToggle() { 
  // Declaração do estado 'isDarkMode' para armazenar se o tema atual é escuro. O estado inicia como `false`.
  const [isDarkMode, setIsDarkMode] = useState(false); 

  // Cria uma instância do roteador para controlar a navegação e recarregar a página.
  const router = useRouter(); 

  // useEffect é executado uma vez ao montar o componente.
  useEffect(() => {
    // Verifica se o tema salvo no localStorage é "dark".
    const currentTheme = localStorage.getItem('theme') === 'dark'; 

    // Atualiza o estado `isDarkMode` com base no tema recuperado.
    setIsDarkMode(currentTheme); 

    // Adiciona ou remove a classe 'dark' ao elemento <html>, dependendo do tema.
    document.documentElement.classList.toggle('dark', currentTheme); 
  }, []); // [] indica que este efeito só será executado uma vez na montagem do componente.

  // Função que alterna o tema entre claro e escuro.
  const toggleTheme = () => {
    // Inverte o valor atual de `isDarkMode`.
    const newTheme = !isDarkMode; 

    // Atualiza o estado com o novo valor.
    setIsDarkMode(newTheme); 

    // Adiciona ou remove a classe 'dark' ao elemento <html>, conforme o novo tema.
    document.documentElement.classList.toggle('dark', newTheme); 

    // Salva o tema selecionado no localStorage como 'dark' ou 'light'.
    localStorage.setItem('theme', newTheme ? 'dark' : 'light'); 

    // Recarrega a página para garantir a aplicação correta do tema, evitando erros de hidratação no Next.js.
    router.refresh(); 
  };

  // Retorna o botão de alternância de tema.
  return (
    <button
      // Adiciona um evento de clique que chama a função toggleTheme.
      onClick={toggleTheme} 
      
      // Define a aparência do botão dependendo do tema usando classes do Tailwind CSS.
      className="p-2 bg-gray-200 dark:bg-gray-800 rounded-full text-xl text-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 transition"
      
      // Define a acessibilidade do botão, permitindo que leitores de tela identifiquem a ação do botão.
      aria-label="Toggle Theme"
    >
      {/* Renderiza um ícone condicional: um sol para o tema claro e uma lua para o tema escuro. */}
      <i className={`pi ${isDarkMode ? 'pi-moon' : 'pi-sun'}`}></i> 
    </button>
  );
}
