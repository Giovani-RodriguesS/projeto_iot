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
    const div = document.createElement("div"); // Cria um elemento <div> para processar o conteúdo.
    div.innerHTML = html; // Define o conteúdo do <div> como a string com HTML.
    return div.textContent || div.innerText || ""; // Extrai e retorna apenas o texto limpo, removendo qualquer tag HTML.
  };

  // Função principal para gerar o PDF
  const downloadPDFHandler = async () => {
    const pdf = new jsPDF(); // Cria uma nova instância do jsPDF para gerar o relatório PDF.
    const chartCanvas = document.querySelector("canvas") as HTMLCanvasElement; // Seleciona o elemento <canvas> do gráfico (se existir).

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

    const [startDate, endDate] = parameters.dates || [null, null]; // Desestrutura as datas selecionadas no intervalo (ou define como null se não houver).
    pdf.text(
      `Datas: ${startDate ? new Date(startDate).toLocaleDateString() : "N/A"} até ${endDate ? new Date(endDate).toLocaleDateString() : "N/A"}`,
      10, 40 // Adiciona as datas selecionadas no relatório.
    );
    pdf.text(
      `Tipo de Relatório: ${parameters.reportTypes.join(", ") || "N/A"}`,
      10, 50 // Adiciona o(s) tipo(s) de relatório selecionados.
    );

    let nextYPosition = 60; // Define a posição Y inicial para o conteúdo abaixo do cabeçalho.

    // Gráfico
    if (chartCanvas) { // Verifica se o gráfico está presente.
      const chartImage = chartCanvas.toDataURL("image/png"); // Converte o gráfico para uma imagem base64.
      const chartHeight = 90; // Define a altura do gráfico no PDF.
      pdf.addImage(chartImage, "PNG", 10, nextYPosition, 190, chartHeight); // Adiciona o gráfico ao PDF.
      nextYPosition += chartHeight + 10; // Atualiza a posição Y para continuar após o gráfico.
    }

    if (!startDate || !endDate) { // Verifica se as datas foram selecionadas corretamente.
      console.error("Intervalo de datas não foi selecionado."); // Exibe um erro no console.
      return; // Interrompe a geração do PDF.
    }

    const dateRange = generateDateRange(startDate, endDate); // Gera um intervalo de datas baseado nas datas selecionadas.

    // Tabela de Dados
    const tableData = dateRange.map((date) => ({ // Mapeia as datas para criar os dados da tabela.
      date: date, // Define a data.
      quantity: `${Math.floor(Math.random() * 100 + 1)} L`, // Gera um valor aleatório para a quantidade.
      cost: `R$ ${Math.floor(Math.random() * 500 + 50)}`, // Gera um valor aleatório para o custo.
    }));

    const columnWidths = [60, 60, 70]; // Define as larguras das colunas da tabela.
    const rowHeight = 8; // Define a altura de cada linha da tabela.

    pdf.setFont("helvetica", "bold"); // Define a fonte como negrito.
    pdf.text("Tabela de Custos:", 10, nextYPosition); // Adiciona o título da tabela.
    nextYPosition += 10; // Move para a posição da tabela.

    // Cabeçalho da Tabela
    pdf.setFillColor(200, 220, 220); // Define a cor de fundo do cabeçalho da tabela.
    pdf.rect(10, nextYPosition, 190, rowHeight, "F"); // Adiciona o retângulo do cabeçalho.
    pdf.setFont("helvetica", "bold"); // Define a fonte como negrito novamente.
    let xPosition = 10; // Define a posição inicial no eixo X para o cabeçalho.
    ["Data", "Quantidade", "Custo"].forEach((header, index) => { // Itera sobre os cabeçalhos da tabela.
      pdf.text(header, xPosition + 2, nextYPosition + 6); // Adiciona o texto do cabeçalho.
      xPosition += columnWidths[index]; // Move a posição X para o próximo cabeçalho.
    });
    nextYPosition += rowHeight; // Move para a próxima linha abaixo do cabeçalho.

    // Adiciona os dados da tabela com controle de páginas
    tableData.forEach((row) => { // Itera sobre os dados da tabela.
      if (nextYPosition + rowHeight > 270) { // Verifica se a linha ultrapassa o limite inferior da página.
        pdf.addPage(); // Adiciona uma nova página ao PDF.
        nextYPosition = 20; // Redefine a posição Y na nova página.
        pdf.setFont("helvetica", "bold"); // Define a fonte como negrito.
        pdf.text("Continuação:", 10, nextYPosition); // Adiciona o título da tabela na nova página.
        nextYPosition += 10; // Move para a posição do cabeçalho.

        // Adiciona novamente o cabeçalho da tabela na nova página
        pdf.setFillColor(200, 220, 220); // Define a cor de fundo do cabeçalho.
        pdf.rect(10, nextYPosition, 190, rowHeight, "F"); // Adiciona o retângulo do cabeçalho.
        let xPosition = 10; // Define a posição inicial no eixo X.
        ["Data", "Quantidade", "Custo"].forEach((header, index) => { // Itera sobre os cabeçalhos.
          pdf.text(header, xPosition + 2, nextYPosition + 6); // Adiciona o texto do cabeçalho.
          xPosition += columnWidths[index]; // Move a posição X para o próximo cabeçalho.
        });
        nextYPosition += rowHeight; // Move para a próxima linha abaixo do cabeçalho.
      }

      // Adiciona os dados da tabela
      pdf.setFont("helvetica", "normal"); // Define a fonte como normal.
      let xPosition = 10; // Define a posição inicial no eixo X para os dados.
      [row.date, row.quantity, row.cost].forEach((cell, colIndex) => { // Itera sobre os valores da linha.
        pdf.text(cell, xPosition + 2, nextYPosition + 6); // Adiciona o texto do valor.
        pdf.rect(xPosition, nextYPosition, columnWidths[colIndex], rowHeight); // Adiciona um retângulo ao redor do valor.
        xPosition += columnWidths[colIndex]; // Move a posição X para a próxima coluna.
      });
      nextYPosition += rowHeight; // Move para a próxima linha.
    });

    // Observações (aparece apenas se houver conteúdo)
    if (parameters.notes && parameters.notes.trim()) { // Verifica se há observações.
      nextYPosition += 10; // Adiciona um espaço antes do campo de observação.
      pdf.setFont("helvetica", "bold"); // Define a fonte como negrito.
      pdf.text("Observações:", 10, nextYPosition); // Adiciona o título das observações.
      nextYPosition += 10; // Move para a posição do conteúdo.

      const editorContent = document.querySelector(".ql-editor") as HTMLElement; // Seleciona o conteúdo do editor de texto (se existir).
      if (editorContent) { // Se o editor existir:
        const canvas = await html2canvas(editorContent, { scale: 1.5, useCORS: true }); // Converte o conteúdo para imagem.
        const imgData = canvas.toDataURL("image/png"); // Converte a imagem para base64.
        const imgWidth = 190; // Define a largura da imagem no PDF.
        const imgHeight = (canvas.height * imgWidth) / canvas.width; // Calcula a altura proporcional.

        if (nextYPosition + imgHeight > 270) { // Verifica se a imagem ultrapassa o limite inferior da página.
          pdf.addPage(); // Adiciona uma nova página.
          nextYPosition = 20; // Redefine a posição Y.
        }

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
        <Navbar />
        <main className="w-full px-2 sm:px-8 py-4 flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            {/*Configuração*/}
            <section className="bg-gray-200 dark:bg-white rounded-lg p-6">
              <h2 className="text-xl sm:text-2xl font-semibold text-black mb-4">
                Configuração de Relatório
              </h2>
              <label className="block text-lg text-black mb-2">
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

              <div className="mb-3">
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
                  <h2 className="text-xl sm:text-2xl font-semibold text-black mb-4">
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