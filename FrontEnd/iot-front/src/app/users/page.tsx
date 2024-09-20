'use client'

import Header from "@/components/Header";
import Main from "@/components/Main";
import Sidebar from "@/components/Sidebar";


export default function User() {
    return (
        <div className="flex h-screen bg-neutral-100">
            <Sidebar/>
            <div className="flex-1 mr-5 mt-10">
                <Header title="Usuários"/>
            </div>
        </div>
    );
}