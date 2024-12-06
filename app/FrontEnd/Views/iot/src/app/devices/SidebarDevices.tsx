import React, { useState } from "react";
import { SelectButton, SelectButtonChangeEvent } from "primereact/selectbutton";
import Water_pump from "./type/water_pump";
import Sensor from "./type/sensor";
import { Button } from "primereact/button";
import axios from "axios";

export default function SidebarDevices() {
  const [formData, setFormData] = useState({
    dispositivo: "Bomba",
    tipo: "",
    vazao: "",
    localizacao: "",
    nome: "",
    data_instalacao: "",
    umidade: "",
  });

  const options = [
    { label: "Bomba", value: "Bomba" },
    { label: "Sensor", value: "Sensor" },
  ];

  const resetFormData = (dispositivo: string) => {
    if (dispositivo === "Bomba"){
      setFormData({
        dispositivo: "Bomba",
        tipo: "",
        vazao: "",
        localizacao: "",
        nome: "",
        data_instalacao: "",
        umidade: "",
      });
  } else if (dispositivo === "Sensor"){
    setFormData({
      dispositivo: "Sensor",
      tipo: "",
      vazao: "",
      localizacao: "",
      nome: "",
      data_instalacao: "",
      umidade: "",
      });
    }
  }

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleDeviceSubmit = async (e: SelectButtonChangeEvent) => {
    const newDevice = e.value;
    resetFormData(newDevice)
    handleChange("dispositivo", newDevice);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const endpoint =
        formData.dispositivo === "Bomba"
          ? 'http://localhost/api/bomba'
          : 'http://localhost/api/sensor';

      const payload =
        formData.dispositivo === "Bomba"
          ? {
              nome: formData.nome,
              tipo: formData.tipo,
              vazao: formData.vazao,
              localizacao: formData.localizacao,
              data_instalacao: formData.data_instalacao,
            }
          : {
              nome: formData.nome,
              tipo: formData.tipo,
              umidade: formData.umidade,
              data_instalacao: formData.data_instalacao,
            };

      const response = await axios.post(endpoint, payload);
      console.log("Dispositivo cadastrado com sucesso: ", response.data);
    } catch (error) {
      console.error("Erro ao cadastrar dispositivo: ", error);
    }
  };

  return (
    <div className="card flex flex-col bg-gray-100 rounded-lg">
      {/* SelectButton */}
      <div className="flex justify-center items-center mt-0 w-full">
        <SelectButton
          value={formData.dispositivo}
          onChange={handleDeviceSubmit}
          options={options}
          optionLabel="label"
          optionValue="value"
          className="p-button-outlined w-auto"
          itemTemplate={(option) => (
            <div
              className={`p-4 rounded-lg cursor-pointer mt-2 text-center ${
                formData.dispositivo === option.value
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {option.label}
            </div>
          )}
        />
      </div>

      {/* Renderização Condicional */}
      <div className="mt-2">
        {formData.dispositivo === "Bomba" ? (
          <Water_pump formData={formData} onFormChange={handleChange} />
        ) : (
          <Sensor formData={formData} onFormChange={handleChange} />
        )}
      </div>

      {/* Botão de cadastro */}
      <Button
        label="Cadastrar"
        onClick={handleSubmit}
        style={{
          color: "white",
          backgroundColor: "#3b82f6",
          padding: "10px 20px",
          borderWidth: "2px",
          borderRadius: "8px",
          fontSize: "1rem",
          fontWeight: "bold",
          transition: "all 0.3s ease",
        }}
        className="hover:bg-gray-200 mt-4"
      />
    </div>
  );
}
