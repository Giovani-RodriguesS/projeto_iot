'use client';
import React, { useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import SidebarDevices from './SidebarDevices';



export default function AddDevice() {
    const [visible, setVisible] = useState<boolean>(false);

    return (
      <>
        <div className="card flex justify-start w-auto">
            <Sidebar 
                visible={visible} 
                onHide={() => setVisible(false)}
                showCloseIcon={false}
                className='flex justify-center items-center'
                style={{ top: '20%'}}>
                <SidebarDevices />
            </Sidebar>
        </div>
            <div className='flex justify-start w-full mt-5 mb-10'>
              <Button
                label="Criar novo dispositivo"
                severity="info"
                onClick={() => setVisible(true)}
                raised
                className="my-custom-button-class hover:bg-blue-600"
                  />
            </div>
        </>
    );
}