import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import React from "react";


export default function Reports() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-slate-800">
        <Header title="Relatórios" username="Letícia Anhaia" />
        <main>
        <h1>Relatórios</h1>
      </main>
      </div>
    </div>

  );
}
