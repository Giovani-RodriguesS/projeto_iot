"use client";
import React, { useState } from "react";
import Header from "@/components/Header";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, } from "chart.js";
import { jsPDF } from "jspdf";
import { CheckboxChangeEvent, Checkbox } from "primereact/checkbox";
import { Editor } from "primereact/editor";
import 'quill/dist/quill.snow.css';
import html2canvas from "html2canvas";
import LineChart from "../dashboard/LineChart";
import PieChart from "../dashboard/PieChart";
import { Calendar } from "primereact/calendar";
import { format } from 'date-fns';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Reports() {
  const [parameters, setParameters] = useState<{
    reportTypes: string[];
    notes: string;
    dates: [Date, Date] | null;
  }>({
    reportTypes: [],
    notes: "",
    dates: null,
  });

  const [chartData, setChartData] = useState<{
    labels: string[]; // Armazena os rótulos para o gráfico.
    datasets: {
      label: string; // Título do gráfico.
      data: number[]; // Dados do gráfico (valores gerados aleatoriamente).
      backgroundColor: string; // Cor de fundo das barras do gráfico.
      borderRadius: number; // Raio de arredondamento das bordas das barras.
    }[];
  } | null>(null); // Armazena os dados do gráfico ou null se o gráfico não for gerado.


  const generateData = () => {
    const labels = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho"];
    const dataValues = labels.map(() =>
      Math.floor(Math.random() * 5000 + 1000)
    );

    return {
      labels, // Define os rótulos como meses fixos.
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

  const handleGenerateReport = () => {
    const data = generateData();
    setChartData(data);
  };

  const stripHTML = (html: string): string => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  // Função principal para gerar o PDF
  const downloadPDFHandler = async () => {
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' }); // Cria uma nova instância do jsPDF para gerar o relatório PDF.

    // Cabeçalho do Relatório
    pdf.setFillColor(230, 230, 230); // Define a cor de fundo do cabeçalho.
    pdf.rect(0, 0, 210, 30, "F"); // Adiciona um retângulo preenchido na área superior do PDF.
    pdf.setTextColor(0, 102, 204); // Define a cor do texto como azul.
    pdf.setFont("helvetica", "bold"); // Define a fonte para Helvetica em negrito.
    pdf.setFontSize(20); // Define o tamanho da fonte.
    pdf.text("Relatório de Análise", 105, 20, { align: "center" }); // Adiciona o título do relatório, centralizado no cabeçalho.

    // Detalhes do Relatório
    pdf.setFont("helvetica", "normal"); // Define a fonte como normal (não negrito).
    pdf.setTextColor(0, 0, 0); // Define a cor do texto como preto.
    pdf.setFontSize(12); // Define o tamanho da fonte para os detalhes.

    const { dates } = parameters;
    const formattedStartDate = dates?.[0] ? format(dates[0], 'dd/MM/yyyy') : '';
    const formattedEndDate = dates?.[1] ? format(dates[1], 'dd/MM/yyyy') : '';
    const dateRange = formattedStartDate && formattedEndDate
      ? `${formattedStartDate} - ${formattedEndDate}`
      : "Período não selecionado";

    pdf.text(`Período Selecionado: ${dateRange}`, 10, 40);

    const now: Date = new Date();
    const formattedDate: string = format(now, "dd/MM/yyyy - HH:mm:ss");
    pdf.text(`Data de Impressão: ${formattedDate}`, 10, 50);
  
    pdf.text(
      `Tipo de Relatório: ${parameters.reportTypes.join(", ") || "N/A"}`,
      10, 60
    );

    let nextYPosition = 70; // Define a posição Y inicial para o conteúdo abaixo do cabeçalho.

    // Gráfico
    const chartCanvas = document.querySelector("canvas") as HTMLCanvasElement;
    if (chartCanvas) {
      const chartImage = chartCanvas.toDataURL("image/png");
      const chartHeight = 90;
      pdf.addImage(chartImage, "PNG", 10, nextYPosition, 190, chartHeight);
      nextYPosition += chartHeight + 10;
    }

    // Tabela de Dados
    const tableData = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho"].map(
      (month) => ({
        month,
        quantity: `${Math.floor(Math.random() * 100 + 1)} L`,
        cost: `R$ ${Math.floor(Math.random() * 500 + 50)}`,
      })
    );

    // Observações (aparece apenas se houver conteúdo)
    if (parameters.notes && parameters.notes.trim()) { // Verifica se há observações.
      nextYPosition += 10; // Adiciona um espaço antes do campo de observação.
      pdf.setFont("helvetica", "bold"); // Define a fonte como negrito.
      pdf.text("Observações:", 10, nextYPosition); // Adiciona o título das observações.
      nextYPosition += 10; // Move para a posição do conteúdo.

      const editorContent = document.querySelector(".ql-editor") as HTMLElement | null; // Seleciona o conteúdo do editor de texto (se existir).
      if (editorContent) { // Se o editor existir:
        const canvas = await html2canvas(editorContent, { scale: 5.0, useCORS: true }); // Converte o conteúdo para imagem.
        const imgData = canvas.toDataURL("image/png"); // Converte a imagem para base64.
        const imgWidth = 190; // Define a largura da imagem no PDF.
        const imgHeight = (canvas.height * imgWidth) / canvas.width; // Calcula a altura proporcional.

        pdf.addImage(imgData, "PNG", 10, nextYPosition, imgWidth, imgHeight); // Adiciona a imagem ao PDF.
      } else { // Caso não exista conteúdo em formato de imagem:
        pdf.setFont("helvetica", "normal"); // Define a fonte como normal.
        const maxY = 270; // Define o limite inferior da página.
        const lines = pdf.splitTextToSize(stripHTML(parameters.notes || ""), 190); // Divide o texto em linhas ajustadas ao PDF.
        lines.forEach((line: string) => { // Itera sobre as linhas do texto.
          if (nextYPosition + 10 > maxY) { // Verifica se a linha ultrapassa o limite inferior.
            pdf.addPage(); // Adiciona uma nova página.
            nextYPosition = 20; // Redefine a posição Y.
          }
          pdf.text(line, 10, nextYPosition); // Adiciona o texto da linha ao PDF.
          nextYPosition += 10; // Move para a próxima linha.
        });
      }
    }

    // Rodapé
    pdf.setFontSize(10); // Define o tamanho da fonte.
    pdf.setTextColor(150); // Define a cor do texto como cinza.
    pdf.text("Relatório gerado automaticamente pelo sistema", 105, 290, { align: "center" }); // Adiciona o rodapé.
    pdf.save("relatorio.pdf"); // Salva o PDF com o nome "relatorio.pdf".
  };

  // Função para gerenciar as alterações do checkbox
  const handleCheckboxChange = (e: CheckboxChangeEvent) => {
    const { checked, value } = e.target; // Obtém o valor e o estado do checkbox.
    const updatedReportTypes = checked ? [value] : []; // Define o tipo de relatório baseado no estado do checkbox.
    setParameters({ ...parameters, reportTypes: updatedReportTypes }); // Atualiza os parâmetros com os novos tipos de relatório.
  };

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-slate-800 text-black dark:text-white sm:overflow-hidden">
      <div className="flex-1">
        <Header title="Irrigação Smart" username="Usuário" />
        <main className="w-full px-2 sm:px-8 py-4 mt-16 flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            {/*Configuração*/}
            <section className="bg-gray-200 dark:bg-white rounded-lg p-6">
              <h2 className="text-xl sm:text-2xl font-semibold text-black mb-4 text-center">
                Configuração de Relatório
              </h2>
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
              <div className="mb-3">
                <div className="flex flex-wrap gap-2 justify-center">
                  <Checkbox
                    inputId="Monitoramento dos Sensores"
                    value="Monitoramento dos Sensores"
                    onChange={handleCheckboxChange}
                    checked={parameters.reportTypes.includes("Monitoramento dos Sensores")}
                  />
                  <label htmlFor="Ativações da Bomba" className=" text-gray-600 dark:text-gray-700">
                    Monitoramento dos sensores
                  </label>
                  <Checkbox
                  className="ml-10"
                    inputId="Monitoramento Chuva"
                    value="Monitoramento Chuva"
                    onChange={handleCheckboxChange}
                    checked={parameters.reportTypes.includes("Monitoramento Chuva")}
                  />
                  <label htmlFor="Consumo de Água" className=" text-gray-600 dark:text-gray-700">
                    Monitoramento Chuva
                  </label>
                </div>
              </div>
              <div className="mb-2">
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
                  className="dark:bg-white dark:text-black" //
                />
              </div>
              <button
                className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300 shadow-lg mt-6"
                onClick={handleGenerateReport}
              >
                Gerar Relatório
              </button>
            </section>

            {/* Gráfico */}
            <section className="bg-gray-200 dark:bg-white shadow-lg rounded-lg p-4 w-full">
              {chartData ? (
                <>
                  <div className="text-center">
                    <h2 className="text-xl sm:text-2xl font-semibold text-black mb-4">
                      Gráfico do Relatório
                    </h2>
                  </div>
                  <div>
                    {parameters.reportTypes.includes("Monitoramento dos Sensores") ? (
                      <LineChart />
                    ) : parameters.reportTypes.includes("Monitoramento Chuva") ? (
                      <PieChart />
                    ) : (
                      <p className="text-gray-500">Selecione um tipo de relatório para visualizar.</p>
                    )}
                  </div>
                  <button
                    className="mt-6 bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition duration-300 shadow-lg"
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