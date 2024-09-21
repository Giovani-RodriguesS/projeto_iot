'use client'

interface CardProps {
    title: string;
    bg_color: string;
    content?: string;
    measures?: string;
}

export default function Card({ title, content, measures, bg_color }: CardProps) {
    return (
        <div className={`card up-transition ${bg_color}`}>
            <h2>{title}</h2>
            {content && <p className="font-bold mt-4">{content} {measures}</p>}
        </div>
    );
}   