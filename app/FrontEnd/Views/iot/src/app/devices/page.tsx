import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import React from "react";


export default function Sensors() {
  return (
    <div className="flex">
      <div className="flex-1 bg-slate-800">
        <Header title="Sensores" username="Letícia Anhaia"/>
        <Navbar />
        <main>
        <h1>Sensores</h1>
      </main>
      </div>
    </div>

  );
}
