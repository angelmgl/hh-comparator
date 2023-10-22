import { useState } from "react";
import SelectInput from "./SelectInput";

export default function Accordeon({
    filters,
    changeFilters,
    propertyTypeOptions,
    operationTypeOptions,
    zoneOptions,
    localOptions,
}) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="flex justify-between items-center py-2 px-8 border border-gray-300 rounded cursor-pointer hover:bg-gray-100"
            >
                <h2 className="text-2xl font-semibold">Filtros</h2>
                <span className="text-2xl font-semibold">
                    {isOpen ? "-" : "+"}
                </span>
            </div>
            {isOpen && (
                <div className="border-l border-r border-b border-gray-300 p-4 rounded mt-4 grid grid-cols-4 gap-4">
                    <SelectInput
                        label="Tipo de propiedad *"
                        placeholder="Selecciona un tipo de propiedad..."
                        options={propertyTypeOptions}
                        defaultValue={filters.propertyType}
                        handleChange={changeFilters}
                        field="propertyType"
                    />
                    <SelectInput
                        label="Tipo de operación"
                        placeholder="Selecciona un tipo de operación..."
                        options={operationTypeOptions}
                        defaultValue={filters.operationType}
                        handleChange={changeFilters}
                        field="operationType"
                    />
                    <SelectInput
                        label="Zona"
                        placeholder="Selecciona una zona..."
                        options={zoneOptions}
                        defaultValue={filters.zone}
                        handleChange={changeFilters}
                        field="zone"
                    />
                    <SelectInput
                        label="Localidad"
                        placeholder="Selecciona una localidad..."
                        options={localOptions}
                        defaultValue={filters.local}
                        handleChange={changeFilters}
                        field="local"
                    />
                </div>
            )}
        </div>
    );
}
