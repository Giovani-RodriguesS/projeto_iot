'use client';

import React, { useState, useEffect } from "react";
import Image from "next/image";
import ThemeToggle from "@/components/ThemeToggle";
import { useRouter } from "next/navigation";
import { TabMenu } from "primereact/tabmenu";
import { MenuItem } from "primereact/menuitem";
import "../app/globals.css";

interface HeaderProps {
  title: string;
  username?: string;
}

export default function Header({ username }: HeaderProps) {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [settingsMenuVisible, setSettingsMenuVisible] = useState(false);
  const [settingsPosition, setSettingsPosition] = useState<'left' | 'right'>('right');
  const [isClient, setIsClient] = useState(false);  // Track client-side rendering
  const [nomeUsuario, setNomeUsuario] = useState<string | null>(null);

  const items: MenuItem[] = [
    { label: "Início", icon: "pi pi-home", command: () => router.push("/home") },
    { label: "Dashboard", icon: "pi pi-chart-bar", command: () => router.push("/dashboard") },
    { label: "Usuários", icon: "pi pi-user", command: () => router.push("/users") },
    { label: "Dispositivos", icon: "pi pi-microchip", command: () => router.push("/devices") },
    { label: "Relatório", icon: "pi pi-clipboard", command: () => router.push("/reports") },
    {
      label: "Configurações", 
      icon: "pi pi-cog", 
      command: () => setSettingsMenuVisible(!settingsMenuVisible) // Alterna a visibilidade do menu de configurações
    },
  ];

  const settingsItems = [
    {
      label: 'Tema',
      icon: isClient && document.documentElement.classList.contains('dark') ? 'pi pi-sun' : 'pi pi-moon',  // Safe access to `document`
      command: () => {
        const isDark = document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        const updatedItems = settingsItems.map(item =>
          item.label === 'Tema'
            ? { ...item, icon: isDark ? 'pi pi-sun' : 'pi pi-moon' }
            : item
        );
        setSettingsMenuVisible(false); 
      },
    },
    {
      label: 'Logout',
      icon: 'pi pi-sign-out',
      command: () => {
        localStorage.removeItem('nomeUsuario'), // Remove o nome do usuário
        router.push('/login')
      }
    },
  ];

  useEffect(() => {
    const storedNomeUsuario = localStorage.getItem('nomeUsuario');
    setNomeUsuario(storedNomeUsuario); // Atualiza o estado com o nome do usuário

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    setIsClient(true);  // Set client flag to true after component mounts
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <header className="header flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-800 text-lg">
      {/* Parte esquerda (saudação do usuário) */}
      <div className="flex items-center">
        {username && (
          <div className="flex items-center space-x-2">
            <Image
              src="/images/profiles/user.jpg"
              width={32}
              height={32}
              alt="user profile"
              className="photo rounded-full w-8 h-8"
            />
            <span className="user-name text-gray-700 dark:text-gray-300 text-sm">
              Bem-Vindo, {nomeUsuario || "Usuário"}
            </span>
          </div>
        )}
      </div>

      {/* Navegação */}
      <div className="mx-10">
        {isMobile ? (
          <div className="relative">
            <button
              onClick={() => setMenuVisible(!menuVisible)}
              className="p-2 rounded-md bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-gray-100 flex items-center"
            >
              <i className={`pi ${menuVisible ? "pi-times" : "pi-bars"} text-base`}></i>
            </button>

            {/* Menu dropdown */}
            {menuVisible && (
              <ul className="absolute right-0 mt-2 space-y-1 bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-gray-100 rounded-lg p-2 z-10 shadow-lg">
                {items.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center p-2 rounded-md hover:bg-gray-200 dark:hover:bg-slate-500 cursor-pointer text-sm"
                    onClick={(e) => {
                      item.command?.({ originalEvent: e, item });
                      setMenuVisible(false); 
                    }}
                  >
                    <i className={`${item.icon} mr-2 text-lg`}></i>
                    {item.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : (
          <TabMenu
            model={items}
            className="w-full bg-transparent rounded-lg custom-tabmenu text-xl"
          />
        )}

        {/* Menu de configurações */}
        <div className="relative">
          {settingsMenuVisible && (
            <ul className={`absolute ${settingsPosition === 'left' ? 'left-4' : 'right-4'} mt-2 bg-gray-100 dark:bg-slate-800 rounded-lg shadow-lg p-3 z-2`}>
              {settingsItems.map((item, index) => (
                <li
                  key={index}
                  className="cursor-pointer p-2 hover:bg-gray-200 text-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
                  onClick={() => {
                    item.command?.();
                    setSettingsMenuVisible(false);
                  }}
                >
                  <i className={`${item.icon} mr-2 text-lg`}></i>
                  {item.label}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </header>
  );
}
