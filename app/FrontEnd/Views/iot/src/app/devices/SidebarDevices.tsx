import React, { useEffect, useState } from "react";
import { SelectButton, SelectButtonChangeEvent } from "primereact/selectbutton";
import Water_pump from "./type/water_pump";
import Sensor from "./type/sensor";
import { Button } from "primereact/button";
import axios from "axios";
import { Dialog } from "primereact/dialog";

export default function SidebarDevices() {
  const [formData, setFormData] = useState({
    dispositivo: "Bomba",
    tipo: "",
    vazao: "",
    localizacao: "",
    nome: "",
    data_instalacao: "",
    umidade: "",
    imagem: ""
  });
  const [showPopup, setShowPopup] = useState(false); // Estado do pop-up

  const options = [
    { label: "Bomba", value: "Bomba" },
    { label: "Sensor", value: "Sensor" }
  ];

  const resetFormData = (dispositivo: string) => {
    if (dispositivo === "Bomba") {
      setFormData({
        dispositivo: "Bomba",
        tipo: "",
        vazao: "",
        localizacao: "",
        nome: "",
        data_instalacao: "",
        umidade: "",
        imagem: ""
      });
    } else if (dispositivo === "Sensor") {
      setFormData({
        dispositivo: "Sensor",
        tipo: "",
        vazao: "",
        localizacao: "",
        nome: "",
        data_instalacao: "",
        umidade: "",
        imagem: ""
      });
    }
  };

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleDeviceSubmit = async (e: SelectButtonChangeEvent) => {
    const newDevice = e.value;
    resetFormData(newDevice);
    handleChange("dispositivo", newDevice);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const endpoint =
        formData.dispositivo === "Bomba"
          ? "http://localhost/api/bomba"
          : "http://localhost/api/sensor";

      const payload =
        formData.dispositivo === "Bomba"
          ? {
              nome: formData.nome,
              tipo: formData.tipo,
              vazao: formData.vazao,
              localizacao: formData.localizacao,
              data_instalacao: formData.data_instalacao,
              imagem: formData.imagem
            }
          : {
              nome: formData.nome,
              tipo: formData.tipo,
              umidade: formData.umidade,
              data_instalacao: formData.data_instalacao,
              imagem: formData.imagem
            };

      const responsePOST = await axios.post(endpoint, payload);
      console.log("Dispositivo cadastrado com sucesso: ", responsePOST.data);
      
      resetFormData(formData.dispositivo);

      setShowPopup(true); // Exibe o pop-up
      setTimeout(() => setShowPopup(false), 2000); // Oculta após 2 segundos
    } catch (error) {
      console.error("Erro ao cadastrar dispositivo: ", error);
    }
    setTimeout(() => {
      window.location.reload(); // Recarrega a página
    }, 2000); // Aguarda 2 segundos
  };

  return (
    <div className="card flex flex-col bg-gray-100 mt-4" style={{ borderRadius: "0px 8px 8px 0px" }}>
      <h2 className="sidebar-title bg-blue-500 text-center" style={{ fontSize: "1.5rem", borderRadius: "0px 8px 0px 0px" }}>
        Cadastro Dispositivo
      </h2>
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
                formData.dispositivo === option.value ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
              }`}
            >
              {option.label}
            </div>
          )}
        />
      </div>

      <div className="mt-2">
        {formData.dispositivo === "Bomba" ? (
          <Water_pump formData={formData} onFormChange={handleChange} />
        ) : (
          <Sensor formData={formData} onFormChange={handleChange} />
        )}
      </div>

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
          transition: "all 0.3s ease"
        }}
        className="hover:bg-gray-200 mt-4"
      />

      <Dialog
        header=""
        visible={showPopup}
        style={{ 
          width: "25vw", 
          textAlign: "center", 
          position:"absolute",  
          top: '10%', 
          left: '89%', 
          transform: 'translateX(-50%)', 
          backgroundColor: 'rgba(0, 200, 0, 3)',
          borderRadius: '8px',
        }}
        draggable={false}
        closable={false}
        onHide={() => setShowPopup(false)}
      >
        <div className="p-4 rounded-md flex items-center justify-center">
          <p className="text-sm text-white font-bold">Dispositivo cadastrado com sucesso!</p>
        </div>
      </Dialog>
    </div>
  );
}