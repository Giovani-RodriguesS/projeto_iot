import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import React from "react";


export default function Reports() {
  return (
    <div className="flex">
      <div className="flex-1 bg-slate-800">
        <Header title="Relatórios" username="Letícia Anhaia" />
        <Navbar />
        <main>
        <h1>Relatórios</h1>
      </main>
      </div>
    </div>

  );
}
