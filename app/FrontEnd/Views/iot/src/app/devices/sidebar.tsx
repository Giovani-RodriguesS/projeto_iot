import React from 'react';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';

export default function SidebarDevices() {
    return (
        <div className="card flex flex-col gap-4 p-6 bg-gray-100 rounded-lg shadow-lg">
            <div className="flex items-center border border-gray-300 rounded-lg bg-white p-4">
                <div className="text-blue-500 text-2xl mr-4">
                    <i className="pi pi-cog"></i>
                </div>
                <InputText placeholder="Nome" className="w-full p-2 focus:outline-none" />
            </div>

            <div className="flex items-center border border-gray-300 rounded-lg bg-white p-4">
                <div className="text-blue-500 text-2xl mr-4">
                    <i className="pi pi-code"></i>
                </div>
                <InputNumber placeholder="ID" className="w-full p-2 focus:outline-none" />
            </div>

            <div className="flex items-center border border-gray-300 rounded-lg bg-white p-4">
                <div className="text-blue-500 text-2xl mr-4">
                    <i className="pi pi-info-circle"></i>
                </div>
                <InputText placeholder="Tipo" className="w-full p-2 focus:outline-none" />
            </div>

            <div className="flex items-center border border-gray-300 rounded-lg bg-white p-4">
                <div className="text-blue-500 text-2xl mr-4">
                    <i className="pi pi-sliders-v"></i>
                </div>
                <InputText placeholder="Planta" className="w-full p-2 focus:outline-none" />
            </div>

                <Button label="Submit" />
        </div>
    );
}
