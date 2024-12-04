'use client';
import React, { useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import SidebarDevices from './SidebarDevices';

export default function AddDevice() {
    const [visible, setVisible] = useState<boolean>(false);

    return (
        <div className="card flex justify-start w-auto">
            <Sidebar 
                visible={visible} 
                onHide={() => setVisible(false)}
                showCloseIcon={false}
                className='flex justify-center items-center'
                style={{ top: '20%', borderRadius: '10px'}}>
                    <h2 className="sidebar-title bg-slate-600 text-center" style={{fontSize:'1.5rem'}}>Cadastro Dispositivo</h2>
                <SidebarDevices />
            </Sidebar>
            <Button 
                icon="pi pi-file-plus" 
                onClick={() => setVisible(true)}
                className="p-button-rounded p-button-lg ml-80" 
                style={{ fontSize: '3rem' }}
            />
        </div>
    );
}