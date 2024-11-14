'use client'
import React, { useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import SidebarDevices from './sidebar';

export default function AddDevice() {
    const [visible, setVisible] = useState<boolean>(false);

    return (
        <div className="card flex justify-center">
            <Sidebar 
                visible={visible} 
                onHide={() => setVisible(false)} 
                style={{ top: '10%' }} 
                className="w-full md:w-80 h-3/4"
            >
                <h2>Cadastro de Dispositivo</h2>
                <SidebarDevices/>
            </Sidebar>
            <Button icon="pi pi-file-plus" onClick={() => setVisible(true)} />
        </div>
    )
}
