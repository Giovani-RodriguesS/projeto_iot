'use client'
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Main from "@/components/Main"

export default function Home() {
    return (
        <div className="flex h-screen bg-neutral-100">
            <Sidebar/>
            <div className="flex-1 mr-5 mt-10">
                <Header title="Home" user="Giovani"/>
                <Main/>
            </div>
        </div>
    );
}

/*
- Tela Usuario
- Aperfeiçoar design
- Otimizar Código
*/
