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

            <div className="div-user-content">
                <p className="text-lg font-semibold">{position}</p>
                <p className="text-lg font-mono">{sector}</p>
                <p className="text-base">{codeId}</p>
                <h1 className="text-3xl font-bold ">{name}</h1>
            </div>
        </div>
    );
}