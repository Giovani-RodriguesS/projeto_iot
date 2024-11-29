"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import {Chart as ChartJS,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend,} from "chart.js";
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
  const pdf = new jsPDF(); // Cria uma nova instância do jsPDF
  const chartCanvas = document.querySelector("canvas") as HTMLCanvasElement;

  // **Cabeçalho do Relatório**
  pdf.setFillColor(230, 230, 230); // Cor de fundo cinza claro
  pdf.rect(0, 0, 210, 30, "F"); // Desenha o fundo do cabeçalho
  pdf.setTextColor(0, 102, 204); // Cor azul para o título
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(20);
  pdf.text("Relatório de Análise", 105, 20, { align: "center" }); // Título centralizado

  // **Detalhes do Relatório**
  pdf.setFont("helvetica", "normal");
  pdf.setTextColor(0, 0, 0); // Texto preto
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

  // **Observações (Renderiza diretamente do Editor Rich Text)**
  pdf.setFont("helvetica", "bold");
  pdf.text("Observações:", 10, 60);
  
  const editorContent = document.querySelector(".ql-editor") as HTMLElement;
  let nextYPosition = 70;

  if (editorContent) {
    const canvas = await html2canvas(editorContent, { scale: 1.5, useCORS: true });
    const imgData = canvas.toDataURL("image/png");
    const imgWidth = 190; // Largura da imagem no PDF
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 10, nextYPosition, imgWidth, imgHeight);
    nextYPosition += imgHeight + 10; // Ajusta a posição para a tabela
  } else {
    pdf.setFont("helvetica", "normal");
    pdf.text(stripHTML(parameters.notes || ""), 10, nextYPosition, { maxWidth: 190 });
    nextYPosition += 20;
  }

  // **Tabela de Dados**
  const tableData = [
    ["Item", "Quantidade", "Custo"],
    ["Água", "500L", "R$ 200"],
    ["Eletricidade", "100kWh", "R$ 150"],
    ["Manutenção", "Mensal", "R$ 300"],
  ];

  pdf.setFont("helvetica", "bold");
  pdf.text("Tabela de Custos:", 10, nextYPosition);
  nextYPosition += 10;

  tableData.forEach((row, index) => {
    const isHeader = index === 0;
    pdf.setFont(isHeader ? "helvetica" : "helvetica", isHeader ? "bold" : "normal");
    pdf.setFillColor(230, 240, 240); // Cor diferente para cabeçalho
    pdf.rect(10, nextYPosition, 190, 8, "F"); // Fundo da linha
    pdf.text(row.join("            "), 12, nextYPosition + 6); // Exibe o conteúdo da tabela
    nextYPosition += 8;
  });

  // **Adicionando o Gráfico**
  if (chartCanvas) {
    const chartImage = chartCanvas.toDataURL("image/png");
    const chartHeight = 90;
    pdf.addImage(chartImage, "PNG", 10, nextYPosition + 10, 190, chartHeight);
    nextYPosition += chartHeight + 20; // Adiciona o gráfico sem sobreposição
  }

  // **Rodapé**
  pdf.setFontSize(10);
  pdf.setTextColor(150); // Cor de texto cinza claro
  pdf.text("Relatório gerado automaticamente pelo sistema",105, 290,{ align: "center" });

  // Salva o PDF gerado
  pdf.save("relatorio.pdf");
};

  const handleCheckboxChange = (e: CheckboxChangeEvent) => { // Função chamada ao alterar os tipos de relatório.
    const { checked, value } = e.target; // Obtém o valor e o estado do checkbox.
    const updatedReportTypes = checked
      ? [...parameters.reportTypes, value] // Se o checkbox for marcado, adiciona o tipo ao array.
      : parameters.reportTypes.filter((type) => type !== value); // Se desmarcado, remove o tipo.

    setParameters({ ...parameters, reportTypes: updatedReportTypes }); // Atualiza os parâmetros do estado.
  };

  return (
    <div className="flex h-screen bg-black text-black">
      <div className="flex-1">
        <Header title="Relatórios" username="Letícia Anhaia" />
        <Navbar />
        <main className="w-full max-w-8xl px-8 py-10 flex flex-col">
        <div className="grid grid-cols-2 gap-10 mt-10">
            {/* Configuração */}
            <section className="bg-white shadow-lg rounded-lg p-8 w-full">
              <h2 className="text-2xl font-semibold text-black mb-6">
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
                  className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500"
                  panelClassName="custom-calendar-panel"
                />
              </div>
              <div className="mb-6">
                <div className="flex flex-wrap gap-4">
                  <Checkbox
                    inputId="financeiro"
                    value="Financeiro"
                    onChange={handleCheckboxChange}
                    checked={parameters.reportTypes.includes("Financeiro")}
                  />
                  <label htmlFor="financeiro" className="ml-2 text-gray-600">
                    Financeiro
                  </label>
                  <Checkbox
                    inputId="operacional"
                    value="Operacional"
                    onChange={handleCheckboxChange}
                    checked={parameters.reportTypes.includes("Operacional")}
                  />
                  <label htmlFor="operacional" className="ml-2 text-gray-600">
                    Operacional
                  </label>
                  <Checkbox
                    inputId="vendas"
                    value="Vendas"
                    onChange={handleCheckboxChange}
                    checked={parameters.reportTypes.includes("Vendas")}
                  />
                  <label htmlFor="vendas" className="ml-2 text-gray-600">
                    Vendas
                  </label>
                  <Checkbox
                    inputId="clientes"
                    value="Clientes"
                    onChange={handleCheckboxChange}
                    checked={parameters.reportTypes.includes("Clientes")}
                  />
                  <label htmlFor="clientes" className="ml-2 text-gray-600">
                    Clientes
                  </label>
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  Observações
                </label>
                <Editor
                  value={parameters.notes}
                  onTextChange={(e) =>
                    setParameters({ ...parameters, notes: e.htmlValue || "" })
                  }
                  style={{ height: "200px" }}
                  placeholder="Adicione suas observações..."
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
            <section className="bg-white shadow-lg rounded-lg p-8 w-full">
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