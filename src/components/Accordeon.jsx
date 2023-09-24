import { useState } from "react";

export default function Accordeon() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="flex justify-between items-center py-2 px-8 border border-gray-300 rounded cursor-pointer hover:bg-gray-100"
            >
                <h2 className="text-2xl font-semibold">Filtros</h2>
                <span className="text-2xl font-semibold">{isOpen ? "-" : "+"}</span>
            </div>
            {isOpen && (
                <div className="border-l border-r border-b border-gray-300 p-4 rounded">
                    Filtros...
                </div>
            )}
        </div>
    );
}
