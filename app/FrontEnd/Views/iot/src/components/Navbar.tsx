'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { TabMenu } from 'primereact/tabmenu';
import { MenuItem } from 'primereact/menuitem';
import '../app/globals.css';

export default function NavBar() {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  const items: MenuItem[] = [
    { label: 'Home', icon: 'pi pi-home', command: () => router.push('/home') },
    { label: 'Dashboard', icon: 'pi pi-chart-bar', command: () => router.push('/dashboard') },
    { label: 'Usuários', icon: 'pi pi-user', command: () => router.push('/users') },
    { label: 'Dispositivos', icon: 'pi pi-microchip', command: () => router.push('/devices') },
    { label: 'Relatório', icon: 'pi pi-clipboard', command: () => router.push('/reports') },
    { label: 'Logout', icon: 'pi pi-sign-out', command: () => router.push('/register') },
  ];

  // Detectar mudanças de tamanho da tela
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="w-full bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-gray-100">
      <div className="container mx-auto p-4">
        {isMobile ? (
          <div>
            {/* Botão do menu hambúrguer */}
            <button
              onClick={() => setMenuVisible(!menuVisible)}
              className="p-3 rounded-md bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-gray-100 flex items-center justify-between w-full"
            >
              <span>Menu</span>
              <i className={`pi ${menuVisible ? 'pi-times' : 'pi-bars'} text-xl`}></i>
            </button>

            {/* Menu expandindo para baixo */}
            {menuVisible && (
              <ul className="mt-2 space-y-2 bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-gray-100 rounded-lg p-4">
                {items.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center p-2 rounded-md hover:bg-gray-700 cursor-pointer"
                    onClick={item.command}
                  >
                    <i className={`${item.icon} mr-3`}></i>
                    {item.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : (
          <div className="flex justify-center w-screen text-2xl md:text-3xl">
            <div className="flex flex-col items-center justify-center">
              <TabMenu model={items} className="w-full bg-transparent rounded-lg custom-tabmenu mt-4" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
