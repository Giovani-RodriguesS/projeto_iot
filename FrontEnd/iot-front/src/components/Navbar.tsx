'use client'
import Link from 'next/link';
import '../styles/styles.css';
import { usePathname } from "next/navigation";

export default function Navbar() {
    
    const pathName = usePathname();

    return (
        <nav className="navbar">
            
            <Link href={'/'} className={`navlink ${pathName === `/` ? 'active' : ' '}`}>
                <i className="pi pi-home mr-2"></i>
                Home
            </Link>
            <Link href={'/users'} className={`navlink ${pathName === `/users` ? 'active' : ' '}`}>
                <i className={`pi ${pathName === `/users` ? 'pi-users' : 'pi-user'} mr-2`}></i>
                Users
            </Link>
            <Link href={'/sensors'} className={`navlink ${pathName === `/sensors` ? 'active' : ''}`}>
                <i className={`pi pi-cog ${pathName === `/sensors` ? 'pi-spin' : ' '} mr-2`}></i>
                Sensors
            </Link>
            <Link href={'/reports'} className={`navlink ${pathName === `/reports` ? 'active' : ''}`}>
                <i className={`pi ${pathName === `/reports` ? `pi-flag-fill` : `pi-flag`} mr-2`}></i>
                Reports
            </Link>
        </nav>
    );
}
