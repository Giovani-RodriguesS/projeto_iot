import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";


export default function Sensor() {
    return (
        <div className="card flex flex-col gap-4 p-3 bg-gray-100 rounded-lg">
            <div className="flex items-center border border-gray-300 rounded-lg bg-white p-4">
                <div className="text-blue-500 text-2xl mr-4">
                    <i className="pi pi-cog"></i>
                </div>
                <InputText placeholder="Nome" className="w-full p-2 focus:outline-none" style={{color:'black'}}/>
            </div>

            <div className="flex items-center border border-gray-300 rounded-lg bg-white p-4">
                <div className="text-blue-500 text-2xl mr-4">
                    <i className="pi pi-cloud"></i>
                </div>
                <InputText placeholder="Valor Umidade" className="w-full p-2 focus:outline-none" style={{color:'black'}}/>
            </div>

            <div className="flex items-center border border-gray-300 rounded-lg bg-white p-4">
                <div className="text-blue-500 text-2xl mr-4">
                    <i className="pi pi-calendar"></i>
                </div>
                <InputText placeholder="Data Instalação" className="w-full p-2 focus:outline-none" style={{color:'black'}}/>
            </div>
        </div>
    );
}
