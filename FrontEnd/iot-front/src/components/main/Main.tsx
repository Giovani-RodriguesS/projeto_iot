'use client'
import Cards from "./components/home/Cards";
import Data from "./components/home/Data";
import User from "./components/users/User";


interface MainProps {
    home?: boolean;
    user?: boolean;
    sensors?: boolean;
    report?: boolean;
}

export default function Main({home, user, sensors, report}: MainProps) {
    return (
        <main className="main rounded-b-lg max-w">
            
            {home ? <Cards/>: ''}
            <div className="flex justify-around p-3 mt-4 h-3/4 w-full">
                {home ? <Data/> : ''}
                {user ? <User name="Giovani R" position="Analista de Vendas" sector="Qualidade" codeId="191224" bgColor="bg-white"/> : ''}
            </div>
        
        </main>
    );

}