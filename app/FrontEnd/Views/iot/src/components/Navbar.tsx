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
        { label: 'Logout',
          //icon: 'pi pi-clipboard',
          icon: 'pi pi-sign-out',
        command: () => router.push('/register')
      }
    ];

  function setActiveIndex(index: number): void {
    throw new Error('Function not implemented.');
  }

    return (
      <div className="flex justify-center w-screen bg-transparent text-5xl ">
        <div className="flex flex-col items-center justify-center">
          <TabMenu 
            model={items}
            className="w-full bg-transparent rounded-lg text-white custom-tabmenu mt-4"
            />
        </div>
      </div>
    );
}
