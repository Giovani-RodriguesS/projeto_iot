'use client';
import React, { useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import SidebarDevices from './sidebar';

export default function AddDevice() {
    const [visible, setVisible] = useState<boolean>(false);

    return (
        <div className="card flex justify-start w-auto">
            <Sidebar 
                visible={visible} 
                onHide={() => setVisible(false)}
                style={{ top: '10%' }}
                className="w-full md:w-80 h-3/4 text-center bg-transparent justify-center sidebar-large-text">
                <h2 className="sidebar-title mb-2" style={{fontSize:'1.5rem'}}>Cadastro Dispositivo</h2>
                <SidebarDevices />
            </Sidebar>
            <Button 
                icon="pi pi-file-plus" 
                onClick={() => setVisible(true)} 
                className="p-button-rounded p-button-lg ml-24" 
                style={{ fontSize: '3rem' }}
            />
        </div>
    );
}
