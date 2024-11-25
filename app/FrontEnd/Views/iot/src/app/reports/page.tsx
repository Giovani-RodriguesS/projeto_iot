"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import { jsPDF } from "jspdf";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Reports() {
  const [parameters, setParameters] = useState({
    period: "lastWeek",
    reportType: "production",
  });
  const [chartData, setChartData] = useState(null);

  // Função para gerar datas com base no período selecionado
  const generateDates = () => {
    const dates = [];
    const today = new Date();

    if (parameters.period === "lastWeek") {
      for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(today.getDate() - i);
        dates.push(date.toISOString().split("T")[0]); // Formato YYYY-MM-DD
      }
    } else if (parameters.period === "lastMonth") {
      const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      const endOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);

      while (lastMonth <= endOfLastMonth) {
        dates.push(lastMonth.toISOString().split("T")[0]);
        lastMonth.setDate(lastMonth.getDate() + 1);
      }
    }


    return dates;
  };

  // Função para simular os dados
  const generateData = () => {
    const dates = generateDates();
    const dataValues = dates.map(() => Math.floor(Math.random() * 5000 + 1000));

    return {
      labels: dates,
      datasets: [
        {
          label:
            parameters.reportType === "production"
              ? "Produção"
              : parameters.reportType === "energyConsumption"
                ? "Consumo de Energia"
                : "Defeitos",
          data: dataValues,
          backgroundColor: "#4F46E5",
        },
      ],
    };
  };

  // Função chamada ao clicar no botão de gerar relatório
  const handleGenerateReport = () => {
    const data = generateData();
    setChartData(data);
  };

  // Função para exportar o gráfico para PDF
  const downloadPDF = (chartCanvas, parameters, reportData) => {
    const pdf = new jsPDF();

    // Título do Relatório
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(18);
    pdf.text("Relatório Gerado", 105, 15, { align: "center" });

    // Detalhes do Período e Tipo de Relatório
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(12);
    pdf.text(`Período: ${parameters.period}`, 10, 30);
    pdf.text(`Tipo de Relatório: ${parameters.reportType === "production"
        ? "Produção"
        : parameters.reportType === "energyConsumption"
          ? "Consumo de Energia"
          : "Defeitos"
      }`, 10, 40);

    // Adiciona a tabela de dados
    pdf.setFont("helvetica", "bold");
    pdf.text("Dados do Relatório", 10, 60);
    pdf.setFont("helvetica", "normal");

    const startX = 10;
    const startY = 70;
    const rowHeight = 10;

    // Cabeçalho da tabela
    pdf.setFillColor(220, 220, 220); // Fundo cinza
    pdf.rect(startX, startY - 10, 190, rowHeight, "F");
    pdf.text("Data", startX + 5, startY - 2);
    pdf.text("Valor", startX + 100, startY - 2);

    // Dados dinâmicos
    reportData.forEach((row, index) => {
      const y = startY + index * rowHeight;
      pdf.text(row.date, startX + 5, y); // Data
      pdf.text(row.value.toString(), startX + 100, y); // Valor
    });

    // Adicionando o gráfico se disponível
    if (chartCanvas) {
      const chartImage = chartCanvas.toDataURL("image/png");

      
      pdf.addPage(); // Cria uma nova página para o gráfico
      pdf.text("Gráfico do Relatório", 105, 15, { align: "center" });
      pdf.addImage(chartImage, "PNG", 10, 30, 180, 90); // Adiciona o gráfico
    }

    // Rodapé
    pdf.setFont("helvetica", "italic");
    pdf.setFontSize(10);
    pdf.text("Relatório gerado automaticamente pelo sistema", 105, 280, { align: "center" });

    // Salva o PDF
    pdf.save("relatorio_dinamico.pdf");
  };

  const downloadPDFHandler = () => {
    // Dados simulados para o PDF (você pode substituir por seus dados reais)
    const simulatedData = [
      { date: "2024-11-18", value: "1500 unidades" },
      { date: "2024-11-19", value: "1750 unidades" },
      { date: "2024-11-20", value: "1400 unidades" },
      { date: "2024-11-21", value: "1900 unidades" },
      { date: "2024-11-22", value: "1700 unidades" },
    ];

    // Passa o canvas do gráfico, parâmetros e dados para a função
    const chartCanvas = document.querySelector("canvas");
    downloadPDF(chartCanvas, parameters, simulatedData);
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 bg-slate-800 h-full">
        <Header title="Relatórios" username="Letícia Anhaia" />
        <Navbar />
        <main className="w-full max-w-7xl mx-auto px-5 py-7">
          <div className="grid grid-cols-2 gap-6">
            {/* Configuração de Relatório */}
            <section className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-bold text-gray-700 mb-4">Configuração de Relatório</h2>
              <form className="space-y-4">
                <div>
                  <label className="text-gray-600 font-medium block mb-2">Período</label>
                  <select
                    className="w-full border rounded-md p-2"
                    value={parameters.period}
                    onChange={(e) =>
                      setParameters({ ...parameters, period: e.target.value })
                    }
                  >
                    <option value="lastWeek">Última Semana</option>
                    <option value="lastMonth">Último Mês</option>
                  </select>
                </div>
                <div>
                  <label className="text-gray-600 font-medium block mb-2">
                    Tipo de Relatório
                  </label>
                  <select
                    className="w-full border rounded-md p-2"
                    value={parameters.reportType}
                    onChange={(e) =>
                      setParameters({ ...parameters, reportType: e.target.value })
                    }
                  >
                    <option value="production">Produção</option>
                    <option value="energyConsumption">Consumo de Energia</option>
                    <option value="defects">Defeitos</option>
                  </select>
                </div>
              </form>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-4 w-full"
                onClick={handleGenerateReport}
              >
                Gerar Relatório
              </button>
            </section>

            {/* Tabela Resumida */}
            <section className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-bold text-gray-700 mb-4">Tabela Resumida</h2>
              <div className="mt-4 flex gap-4">
                <button
                  className="bg-green-600 text-white px-4 py-2 rounded-lg"
                  onClick={downloadPDFHandler}
                >
                  Baixar PDF
                </button>
              </div>
            </section>
          </div>

          {/* Gráfico */}
          {chartData && (
            <section className="bg-white shadow-md rounded-lg p-6 mt-6">
              <h2 className="text-xl font-bold text-gray-700 mb-4">Gráfico de Relatório</h2>
              <div className="overflow-auto">
                <Bar
                  data={chartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { position: "top" } },
                  }}
                />
              </div>

            </section>
          )}
        </main>
      </div>
    </div>
  );
}
