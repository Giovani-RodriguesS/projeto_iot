'use client';
import React from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import Header from '@/components/Header';
import Navbar from '@/components/Navbar';
import '../globals.css';

export default function Home() {
  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-gray-100">
      <div className="flex-1">
        <Header title="Irrigação Smart" username="Usuário" />
        <Navbar />
        <main className="custom-tabview flex justify-center h-auto mt-8">
          <div className="card bg-gray-200 dark:bg-gray-800 p-6 rounded-lg shadow mt-0 text-3xl w-11/12">
            <TabView className="dark:text-gray-100">
              <TabPanel header="Sobre o Projeto" leftIcon="pi pi-file-edit">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img
                    src="images/home/CapaProjeto.jpeg"
                    alt="Descrição da imagem"
                    style={{ width: '150px', height: 'auto', marginLeft: '1rem' }}
                  />
                  <p className="m-0 text-black dark:text-gray-300 leading-relaxed text-justify" style={{ textIndent: '3rem' }}>
                    O projeto envolve duas turmas de tecnólogos, Análise e Desenvolvimento de Sistemas (ADS) e Mecatrônica, que estão criando um sistema automatizado para regar uma planta.
                    O sistema utilizará sensores de umidade no solo e de chuva para determinar a necessidade de irrigação. A turma de ADS desenvolverá um site para receber e exibir os dados dos sensores, enquanto a turma de Mecatrônica ficará responsável pela implementação do sistema de automação, incluindo a bomba de irrigação e os sensores.
                  </p>
                </div>
              </TabPanel>
              <TabPanel header="Turma Mecatrônica" leftIcon="pi pi-wrench">
                <p className="m-0 text-black dark:text-gray-300 leading-relaxed text-justify" style={{ textIndent: '3rem' }}>
                  A turma de Mecatrônica será responsável pela parte de hardware do projeto, que envolve a instalação e integração dos sensores de umidade do solo e de chuva.
                  Eles também irão configurar o sistema de automação para ativar a bomba de irrigação quando necessário, com base nas leituras dos sensores. A equipe se concentrará no desenvolvimento e controle dos dispositivos eletrônicos, garantindo a funcionalidade do sistema.
                </p>
              </TabPanel>
              <TabPanel header="Turma ADS" leftIcon="pi pi-desktop">
                <p className="m-0 text-black gray-700 dark:text-gray-300 leading-relaxed text-justify" style={{ textIndent: '3rem' }}>
                  A turma de ADS ficará encarregada do desenvolvimento do site, que será responsável por receber, processar e exibir os dados dos sensores de umidade do solo e de chuva.
                  Eles trabalharão na criação da interface do usuário, implementando funcionalidades como visualização de gráficos e histórico de dados, e garantirão a comunicação eficaz entre o site e o sistema de sensores.
                </p>
              </TabPanel>
            </TabView>
          </div>
        </main>
      </div>
    </div>
  );
}
