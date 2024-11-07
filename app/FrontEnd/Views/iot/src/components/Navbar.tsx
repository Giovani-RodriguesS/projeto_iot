'use client';
import React from 'react';
import { TabMenu } from 'primereact/tabmenu';
import { MenuItem } from 'primereact/menuitem';
import '../app/globals.css';

export default function BasicIcons() {
    const items: MenuItem[] = [
        { label: 'Dashboard', icon: 'pi pi-chart-bar' },
        { label: 'Usuários', icon: 'pi pi-user' },
        { label: 'Dispositivos', icon: 'pi pi-microchip' },
        { label: 'Relatório', icon: 'pi pi-clipboard' }
    ];

    return (
      <div className="flex justify-center w-screen bg-transparent text-5xl">
        <div className="flex flex-col items-center justify-center">
          <TabMenu model={items} className="w-full bg-transparent rounded-lg text-white custom-tabmenu mt-3" />
        </div>
      </div>
    );
}
