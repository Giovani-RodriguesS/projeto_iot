'use client'

interface UserProps {
    name: string;
    position: string;
    sector: string;
    codeId: string;
    bgColor?: string; 

}

export default function User({ name, position, sector, codeId, bgColor }: UserProps) {
    return (
        <div 
            className={`card up-transition ${bgColor}`}>

            <div className="userCard">
                <p className="text-lg mt-36 font-semibold">{position}</p>
                <p className="text-lg mt-2 font-mono">{sector}</p>
                <p className="text-base">{codeId}</p>
                <h1 className="text-3xl font-bold mt-6">{name}</h1>
            </div>
        </div>
    );
}