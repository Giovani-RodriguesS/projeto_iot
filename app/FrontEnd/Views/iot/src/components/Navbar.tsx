'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { TabMenu } from 'primereact/tabmenu';
import { MenuItem } from 'primereact/menuitem';
import '../app/globals.css';


export default function NavBar() {
    const router = useRouter();

    const items: MenuItem[] = [
        { label: 'Home',
          icon: 'pi pi-home', 
          command: () => router.push('/home')
        },
        { label: 'Dashboard',
          icon: 'pi pi-chart-bar', 
          command: () => router.push('/dashboard')
        },
        { label: 'Usuários', 
          icon: 'pi pi-user', 
          command: () => router.push('/users')
        },
        { label: 'Dispositivos',
          icon: 'pi pi-microchip',
          command: () => router.push('/devices')
        },
        { label: 'Relatórios',
          //icon: 'pi pi-clipboard',
          icon: 'pi pi-book',
        command: () => router.push('/reports')
      }
    ];

  function setActiveIndex(index: number): void {
    throw new Error('Function not implemented.');
  }

    return (
      <div className="flex justify-center w-screen bg-transparent text-5xl bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-gray-100">
        <div className="flex flex-col items-center justify-center">
          <TabMenu 
            model={items}
            className="w-full bg-transparent rounded-lg custom-tabmenu mt-4 text-gray-900 dark:text-gray-100"
            />
        </div> 
      </div>
    );
}
