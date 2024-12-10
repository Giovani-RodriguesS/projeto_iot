'use client';
import React from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import Header from '@/components/Header';
import Navbar from '@/components/Navbar';
import '../globals.css';

export default function Home() {
  return (
    <div className="flex h-screen overflow-x-hidden">
      <div className="flex-1 bg-white dark:bg-slate-800 text-black dark:text-white w-full">
        <Header title="Irrigação Smart" username="Usuário" />
        <Navbar />
        <main className="custom-tabview flex justify-center h-auto mt-4">
          <div className="card bg-gray-200 dark:bg-slate-700 p-2 rounded-lg shadow mt-0 text-xl w-full max-w-screen-xl">
            {/* TabView com as abas dividindo o espaço da tela */}
            <TabView className="dark:text-gray-100 w-full">
              {/* Primeira aba */}
              <TabPanel header="Sobre Projeto" leftIcon="pi pi-file-edit">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                  {/* Texto à esquerda */}
                  <div className="flex-1">
                    <p className="text-black dark:text-gray-300 leading-relaxed text-justify text-xl md:text-2xl" style={{ textIndent: '3rem' }}>
                      O projeto envolve duas turmas de tecnólogos, Análise e Desenvolvimento de Sistemas (ADS) e Mecatrônica, que estão criando um sistema automatizado para regar uma planta. 
                      O sistema utilizará sensores de umidade no solo e de chuva para determinar a necessidade de irrigação. A turma de ADS desenvolverá um site para receber e exibir os dados dos sensores, 
                      enquanto a turma de Mecatrônica ficará responsável pela implementação do sistema de automação, incluindo a bomba de irrigação e os sensores.
                    </p>
                  </div>
                  {/* Imagem à direita */}
                  <div className="flex-1 flex justify-center md:block">
                    <img
                      src="/images/home/CapaProjeto.jpeg"
                      alt="Irrigação Smart"
                      className="rounded-lg shadow-lg max-w-sm block mx-auto" // Centraliza a imagem
                    />
                  </div>
                </div>
              </TabPanel>
              {/* Segunda aba */}
              <TabPanel header="Turma Mecatrônica" leftIcon="pi pi-wrench">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                  {/* Texto à esquerda */}
                  <div className="flex-1">
                    <p className="text-black dark:text-gray-300 leading-relaxed text-justify text-xl md:text-2xl" style={{ textIndent: '3rem' }}>
                      A turma de Mecatrônica será responsável pela parte de hardware do projeto, que envolve a instalação e integração dos sensores de umidade do solo e de chuva. 
                      Eles também irão configurar o sistema de automação para ativar a bomba de irrigação quando necessário, com base nas leituras dos sensores. A equipe se concentrará no desenvolvimento e controle dos dispositivos eletrônicos, garantindo a funcionalidade do sistema.
                    </p>
                  </div>
                  {/* Imagem à direita */}
                  <div className="flex-1 flex justify-center md:block">
                    <img
                      src="/images/home/mecatronica3.jpg"
                      alt="Irrigação Smart"
                      className="rounded-lg shadow-lg max-w-sm block mx-auto" // Centraliza a imagem
                    />
                  </div>
                </div>
              </TabPanel>
              {/* Terceira aba */}
              <TabPanel header="Turma ADS" leftIcon="pi pi-desktop">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                  {/* Texto à esquerda */}
                  <div className="flex-1">
                    <p className="text-black dark:text-gray-300 leading-relaxed text-justify text-xl md:text-2xl" style={{ textIndent: '3rem' }}>
                      A turma de ADS ficará encarregada do desenvolvimento do site, que será responsável por receber, processar e exibir os dados dos sensores de umidade do solo e de chuva.
                      Eles trabalharão na criação da interface do usuário, implementando funcionalidades como visualização de gráficos e histórico de dados, e garantirão a comunicação eficaz entre o site e o sistema de sensores.
                    </p>
                  </div>
                  {/* Imagem à direita */}
                  <div className="flex-1 flex justify-center md:block">
                    <img
                      src="/images/home/ads1.avif"
                      alt="Irrigação Smart"
                      className="rounded-lg shadow-lg max-w-sm block mx-auto" // Centraliza a imagem
                    />
                  </div>
                </div>
              </TabPanel>
            </TabView>
          </div>
        </main>
      </div>
    </div>
  );
}
