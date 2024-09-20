'use client'
import Image from "next/image";
import '../styles/styles.css';
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function Sidebar() {
    
    const pathName = usePathname();

    return (
        <aside> 
            <Image 
                src="/images/logotipo.png"
                width={499}
                height={499}
                className="w-20 shadow-lg rounded-3xl opacity-2 ml-11 mr-11 mt-8 bg-gray-100"
                alt="LogoTipo"
                />
           <Navbar/>
        </aside>
    );
}