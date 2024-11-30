import React, { useState } from "react";
import { SelectButton, SelectButtonChangeEvent } from "primereact/selectbutton";
import Water_pump from "./type/water_pump";
import Sensor from "./type/sensor";
import { Button } from "primereact/button";
import axios from "axios";

export default function SidebarDevices() {
  const [dispositivo, setDispositivo] = useState('');
  const [tipo, setTipo] = useState('');
  const [vazao, setVazao] = useState('');
  const [localizacao, setLocalizacao] = useState('');
  const [nome, setNome] = useState('');
  const [data_instalacao, setData_instalacao] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const options: { label: string; value: string }[] = [
    { label: "Bomba", value: "Bomba" },
    { label: "Sensor", value: "Sensor" },
  ];
  const [value, setValue] = useState<string>(options[0].value);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const deviceDto = {
        dispositivo,
        tipo,
        vazao,
        localizacao,
        nome,
        data_instalacao
    };
    try {
        if (option_button.value == "Bomba")
        dispositivo = "Bomba";
        tipo = setTipo;
        vazao = setVazao;
        localizacao = setLocalizacao;
        nome = setNome;
        data_instalacao = setData_instalacao;

        const response = await axios.post('http://localhost:5257/api/device', deviceDto);
        console.log('Dispositivo criado:', response.data);
        setResponseData(response.data);
    } catch (error) {
        console.error('Erro:', error);
    }
};

  return (
    <div className="card flex flex-col bg-gray-100 rounded-lg mt-4">
      {/* Botão de seleção */}
      <div className="flex justify-center">
        <SelectButton
          value={value}
          onChange={(e: SelectButtonChangeEvent) => setValue(e.value)}
          options={options}
          optionLabel="label"
          optionValue="value"
          className="w-full p-button-outlined"
          itemTemplate={(option) => (
            <div
              className={`p-4 rounded-lg cursor-pointer mt-5 ${
                value === option.value ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
              }`}
            >
              {option.label}
            </div>
          )}
        />
      </div>

      {/* Renderizar o componente baseado na seleção */}
      <div className="option_button">
        {value === "Bomba" ? <Water_pump /> : <Sensor />}
      </div>
      <Button 
                label="Cadastrar" 
                onClick={handleSubmit}
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
