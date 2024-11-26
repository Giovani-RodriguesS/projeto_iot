import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";


export default function Sensor() {
    return (
        <div className="card flex flex-col gap-4 p-6 bg-gray-100 rounded-lg">
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
            <Button 
                label="Cadastrar" 
                style={{
                    color: 'white', 
                    backgroundColor: '#3b82f6', 
                    padding: '10px 20px',
                    borderWidth: '2px',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    transition: 'all 0.3s ease'
                }} 
                className="hover:bg-gray-200"
            />
        </div>
    );
}
