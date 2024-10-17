import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import React from "react";


export default function Sensors() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-slate-800">
        <Header title="Sensores" username="Letícia Anhaia"/>
        <main>
        <h1>Sensores</h1>
      </main>
      </div>
    </div>

  );
}
