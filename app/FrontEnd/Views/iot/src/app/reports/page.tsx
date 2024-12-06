"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, } from "chart.js";
import { Bar } from "react-chartjs-2";
import { jsPDF } from "jspdf";
import { Calendar } from "primereact/calendar";
import { CheckboxChangeEvent, Checkbox } from "primereact/checkbox";
import { Editor } from "primereact/editor";
import 'quill/dist/quill.snow.css';
import html2canvas from "html2canvas";


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Reports() {
  const [parameters, setParameters] = useState<{
    dates: [Date | null, Date | null] | null; // Armazena o período de datas selecionado.
    reportTypes: string[]; // Armazena os tipos de relatórios selecionados.
    notes: string; // Armazena as observações do usuário.
  }>({
    dates: null, // Inicializa as datas como null.
    reportTypes: [], // Inicializa os tipos de relatório como um array vazio.
    notes: "", // Inicializa as observações como uma string vazia.
  });

  const [chartData, setChartData] = useState<{
    labels: string[]; // Armazena os rótulos das datas para o gráfico.
    datasets: {
      label: string; // Título do gráfico.
      data: number[]; // Dados do gráfico (valores gerados aleatoriamente).
      backgroundColor: string; // Cor de fundo das barras do gráfico.
      borderRadius: number; // Raio de arredondamento das bordas das barras.
    }[];
  } | null>(null); // Armazena os dados do gráfico ou null se o gráfico não for gerado.

  const generateDateRange = (start: Date, end: Date) => { // Função para gerar um intervalo de datas.
    const dateArray: string[] = []; // Array para armazenar as datas formatadas.
    let currentDate = new Date(start); // Cria uma cópia da data de início.
    while (currentDate <= end) { // Enquanto a data atual for menor ou igual à data final.
      dateArray.push(new Date(currentDate).toISOString().split("T")[0]); // Adiciona a data formatada ao array.
      currentDate.setDate(currentDate.getDate() + 1); // Incrementa um dia à data atual.
    }
    return dateArray; // Retorna o array de datas.
  };
  

  const generateData = () => { // Função para gerar os dados do gráfico.
    if (!parameters.dates || parameters.dates.length !== 2) return null; // Verifica se as datas foram selecionadas corretamente.

    const [startDate, endDate] = parameters.dates; // Desestrutura as datas selecionadas.
    if (!startDate || !endDate) return null; // Verifica se as datas são válidas.

    const dateRange = generateDateRange(startDate, endDate); // Gera o intervalo de datas entre a data inicial e final.
    const dataValues = dateRange.map(() =>
      Math.floor(Math.random() * 5000 + 1000) // Gera um valor aleatório para cada data.
    );

    return {
      labels: dateRange, // Define os rótulos como o intervalo de datas.
      datasets: [
        {
          label: "Relatório Gerado", // Define o título do gráfico.
          data: dataValues, // Define os dados do gráfico.
          backgroundColor: "#4F46E5", // Define a cor de fundo das barras.
          borderRadius: 8, // Define o arredondamento das bordas das barras.
        },
      ],
    };
  };

  const handleGenerateReport = () => { // Função chamada ao gerar o relatório.
    const data = generateData(); // Gera os dados do gráfico.
    setChartData(data); // Atualiza o estado com os dados gerados.
  };

  // Função para remover tags HTML, se necessário
  const stripHTML = (html: string): string => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  // Função principal para gerar o PDF
  const downloadPDFHandler = async () => {
    const pdf = new jsPDF();
    const chartCanvas = document.querySelector("canvas") as HTMLCanvasElement;
    
    // Cabeçalho do Relatório
    pdf.setFillColor(230, 230, 230);
    pdf.rect(0, 0, 210, 30, "F");
    pdf.setTextColor(0, 102, 204);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(20);
    pdf.text("Relatório de Análise", 105, 20, { align: "center" });
    
    // Detalhes do Relatório
    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(12);
  
    const [startDate, endDate] = parameters.dates || [null, null];
    pdf.text(
      `Datas: ${startDate ? new Date(startDate).toLocaleDateString() : "N/A"} até ${endDate ? new Date(endDate).toLocaleDateString() : "N/A"}`,
      10, 40
    );
    pdf.text(
      `Tipo de Relatório: ${parameters.reportTypes.join(", ") || "N/A"}`,
      10, 50
    );
  
    let nextYPosition = 60;
  
    // Gráfico
    if (chartCanvas) {
      const chartImage = chartCanvas.toDataURL("image/png");
      const chartHeight = 90;
      pdf.addImage(chartImage, "PNG", 10, nextYPosition, 190, chartHeight);
      nextYPosition += chartHeight + 10;
    }
    if (!startDate || !endDate) {
        console.error("Intervalo de datas não foi selecionado.");
        return;
    }
    const dateRange = generateDateRange(startDate, endDate); // Gera o intervalo de datas

    // Tabela de Dados
    const tableData = dateRange.map((date) => ({
      date: date, // Data no formato YYYY-MM-DD
      quantity: `${Math.floor(Math.random() * 100 + 1)} L`, // Quantidade aleatória
      cost: `R$ ${Math.floor(Math.random() * 500 + 50)}`, // Custo aleatório
    }));

    // Configurações de largura das colunas
    const columnWidths = [60, 60, 70]; // Ajuste conforme necessário

    pdf.setFont("helvetica", "bold");
    pdf.text("Tabela de Custos:", 10, nextYPosition);
    nextYPosition += 10;

    // Adiciona o cabeçalho da tabela
    pdf.setFillColor(200, 220, 220); // Cor do fundo do cabeçalho
    pdf.rect(10, nextYPosition, 190, 8, "F");
    pdf.setFont("helvetica", "bold");
    let xPosition = 10;
    ["Data", "Quantidade", "Custo"].forEach((header, index) => {
      pdf.text(header, xPosition + 2, nextYPosition + 6);
      xPosition += columnWidths[index];
    });
    nextYPosition += 8;

    // Adiciona os dados da tabela
    tableData.forEach((row) => {
      pdf.setFont("helvetica", "normal");
      let xPosition = 10; // Posição inicial no eixo X
      [row.date, row.quantity, row.cost].forEach((cell, colIndex) => {
        pdf.text(cell, xPosition + 2, nextYPosition + 6);
        xPosition += columnWidths[colIndex];
      });
      nextYPosition += 8; // Move para a próxima linha
    });

    // Observações
    nextYPosition += 20;
    pdf.setFont("helvetica", "bold");
    pdf.text("Observações:", 10, nextYPosition);
    nextYPosition += 10;
  // 
    const editorContent = document.querySelector(".ql-editor") as HTMLElement;
    if (editorContent) {
      const canvas = await html2canvas(editorContent, { scale: 1.5, useCORS: true });
      const imgData = canvas.toDataURL("image/png");
      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 10, nextYPosition, imgWidth, imgHeight);
      nextYPosition += imgHeight + 10;
    } else {
      pdf.setFont("helvetica", "normal");
      pdf.text(stripHTML(parameters.notes || ""), 10, nextYPosition, { maxWidth: 190 });
      nextYPosition += 20;
    }
  
    // Rodapé
    pdf.setFontSize(10);
    pdf.setTextColor(150);
    pdf.text("Relatório gerado automaticamente pelo sistema", 105, 290, { align: "center" });
  
    pdf.save("relatorio.pdf");
  };
  
    const handleCheckboxChange = (e: CheckboxChangeEvent) => {
      const { checked, value } = e.target; // Obtém o valor e o estado do checkbox.
    
      // Se o checkbox foi marcado, substituímos o array para conter apenas o novo valor.
      // Se desmarcado, o array ficará vazio.
      const updatedReportTypes = checked ? [value] : [];
    
      // Atualiza o estado com os novos tipos de relatório.
      setParameters({ ...parameters, reportTypes: updatedReportTypes });
    };


  return (
    <div className="flex flex-col h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
      <div className="flex-1">
        <Header title="Relatórios" username="Letícia Anhaia" />
        <Navbar />
        <main className="w-full px-4 sm:px-8 py-6 flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            {/*Configuração*/}
            <section className="bg-gray-200 dark:bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-xl sm:text-2xl font-semibold text-black mb-4">
                Configuração de Relatório
              </h2>
              <div className="mb-6">
                <label className="block text-lg font-medium text-black mb-2">
                  Período
                </label>
                <Calendar
                  value={parameters.dates}
                  onChange={(e) =>
                    setParameters({ ...parameters, dates: e.value as [Date, Date] | null })
                  }
                  selectionMode="range"
                  readOnlyInput
                  hideOnRangeSelection
                  showIcon
                  placeholder="Selecione um período"
                  className="w-full mb-4 border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 dark:border-gray-600 dark:text-black"
                  panelClassName="custom-calendar-panel"
                />
              </div>
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  <Checkbox
                    inputId="Ativações da Bomba"
                    value="Ativações da Bomba"
                    onChange={handleCheckboxChange}
                    checked={parameters.reportTypes.includes("Ativações da Bomba")}
                  />
                  <label htmlFor="Ativações da Bomba" className=" text-gray-600 dark:text-gray-700">
                    Ativações da Bomba
                  </label>
                  <Checkbox
                    inputId="Consumo de Água"
                    value="Consumo de Água"
                    onChange={handleCheckboxChange}
                    checked={parameters.reportTypes.includes("Consumo de Água")}
                  />
                  <label htmlFor="Consumo de Água" className=" text-gray-600 dark:text-gray-700">
                    Consumo de Água
                  </label>
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-lg font-medium text-gray-700 dark:text-gray-700 mb-2">
                  Observações
                </label>
                <Editor
                  value={parameters.notes}
                  onTextChange={(e) =>
                    setParameters({ ...parameters, notes: e.htmlValue || "" })
                  }
                  style={{ height: "150px" }}
                  placeholder="Adicione suas observações..."
                  className="dark:bg-white dark:text-black" // Cor do texto e fundo do editor
                />
              </div>
              <button
                className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition duration-300 shadow-lg mt-4"
                onClick={handleGenerateReport}
              >
                Gerar Relatório
              </button>
            </section>
            {/* Gráfico */}
            <section className="bg-gray-200 dark:bg-white shadow-lg rounded-lg p-8 w-full">
              {chartData ? (
                <>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                    Gráfico do Relatório
                  </h2>
                  <div className="relative h-96">
                    <Bar
                      data={chartData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: { legend: { position: "top" } },
                      }}
                    />
                  </div>
                  <button
                    className="mt-6 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition duration-300 shadow-lg"
                    onClick={downloadPDFHandler}
                  >
                    Baixar PDF
                  </button>
                </>
              ) : (
                <p className="text-gray-500">Configure um relatório para visualizá-lo.</p>
              )}
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}  