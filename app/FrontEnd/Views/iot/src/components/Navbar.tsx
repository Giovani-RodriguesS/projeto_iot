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
        { label: 'Relatório',
          icon: 'pi pi-clipboard',
        command: () => router.push('/reports')
        },
        { label: 'Logout',
          icon: 'pi pi-sign-out',
        command: () => router.push('/register')
      }
    ];

    return (
      <div className="flex justify-center w-screen bg-transparent text-2xl md:text-3xl bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-gray-100">
        <div className="flex flex-col items-center justify-center">
          <TabMenu 
            model={items}
            className="w-full bg-transparent rounded-lg custom-tabmenu mt-4 text-gray-900 dark:text-gray-100"
            />
        </div> 
      </div>
    );
}
