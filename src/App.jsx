import { useEffect, useState } from "react";
import Accordeon from "./components/Accordeon";
import Card from "./components/Card";
import SelectInput from "./components/SelectInput";
import useProperties from "./hooks/useProperties";
import useComparator from "./hooks/useComparator";
import { FiX } from "react-icons/fi";
import "./App.css";

function generateURL(items) {
    const APP_URL = "http://localhost:5173";
    // Crear un array con los pares clave-valor que no sean null
    const queryParams = Object.entries(items).reduce((acc, [key, value]) => {
        if (value !== null) {
            acc.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
        }
        return acc;
    }, []);

    // Unir los pares clave-valor con '&' y concatenarlos a la URL base
    const urlWithParams = `${APP_URL}/?${queryParams.join("&")}`;

    // Copiar la URL al portapapeles
    navigator.clipboard
        .writeText(urlWithParams)
        .then(() => {
            console.log("URL copiada al portapapeles con éxito!");
        })
        .catch((err) => {
            console.error("Error al copiar la URL al portapapeles: ", err);
        });
}

export default function App() {
    const {
        properties,
        filteredProperties,
        filters,
        changeFilters,
        operationTypeOptions,
        propertyTypeOptions,
        zoneOptions,
        localityOptions,
    } = useProperties();

    const {
        currentProperties,
        setCurrentProperties,
        cheapestSale,
        cheapestRent,
        mostBuilded,
        mostLand,
        mostOwned,
        mostValuableSalePerM2Own,
        mostValuableRentPerM2Own,
        mostValuableSalePerM2Build,
        mostValuableRentPerM2Build,
        mostValuableSalePerM2Land,
        mostValuableRentPerM2Land,
    } = useComparator(properties, filters);

    useEffect(() => {
        setCurrentProperties({
            first: null,
            second: null,
            third: null,
            fourth: null,
        });
    }, [filters, setCurrentProperties]);

    const [isLoading, setIsLoading] = useState(true);
    const [showCards, setShowCards] = useState(1);
    const [showAddButton, setShowAddButton] = useState(true);

    // renderizar el loader
    useEffect(() => {
        setTimeout(() => setIsLoading(false), 2000);
    }, []);

    // efecto para saber cuantas cards mostrar
    useEffect(() => {
        const occupiedPlaces = Object.values(currentProperties).filter(
            (value) => value !== null
        ).length;
        setShowCards(occupiedPlaces);
    }, [currentProperties]);

    // efecto para saber si debemos mostrar el botón o no
    useEffect(
        () => setShowAddButton(showCards < 4),
        [showCards, currentProperties]
    );

    const getCurrentPropertyData = (key) => {
        return properties.filter(
            (property) => property.id == currentProperties[key]
        )[0];
    };

    const changeCurrentProperty = (key, value) => {
        setCurrentProperties((prev) => {
            return {
                ...prev,
                [key]: value,
            };
        });
    };

    return (
        <main className="py-12 md:py-20">
            {isLoading && (
                <div className="w-full h-96 flex items-center justify-center">
                    <span className="loader"></span>
                </div>
            )}
            {!isLoading && (
                <div className="custom-container">
                    <Accordeon
                        filters={filters}
                        changeFilters={changeFilters}
                        propertyTypeOptions={propertyTypeOptions}
                        operationTypeOptions={operationTypeOptions}
                        zoneOptions={zoneOptions}
                        localOptions={localityOptions}
                    />
                    <div id="content" className="my-12 md:my-20 relative">
                        <h2 className="text-3xl font-semibold">Inmuebles</h2>
                        <div className="mt-4 grid grid-cols-4 gap-4">
                            <SelectInput
                                label="Nueva propiedad"
                                placeholder="Selecciona una propiedad..."
                                options={filteredProperties}
                                defaultValue={currentProperties.first}
                                handleChange={changeCurrentProperty}
                                field="first"
                                required={true}
                            />
                            {(currentProperties.second || showCards > 1) && (
                                <div className="relative">
                                    <button
                                        onClick={() => {
                                            setShowCards(showCards - 1);
                                            changeCurrentProperty(
                                                "second",
                                                null
                                            );
                                        }}
                                        className="absolute -top-7 right-0 bg-red-500 hover:bg-red-700 text-white p-1"
                                    >
                                        <FiX />
                                    </button>
                                    <SelectInput
                                        label="Nueva propiedad"
                                        placeholder="Selecciona una propiedad..."
                                        options={filteredProperties}
                                        defaultValue={currentProperties.second}
                                        handleChange={changeCurrentProperty}
                                        field="second"
                                        required={true}
                                    />
                                </div>
                            )}
                            {(currentProperties.third || showCards > 2) && (
                                <div className="relative">
                                    <button
                                        onClick={() => {
                                            setShowCards(showCards - 1);
                                            changeCurrentProperty(
                                                "third",
                                                null
                                            );
                                        }}
                                        className="absolute -top-7 right-0 bg-red-500 hover:bg-red-700 text-white p-1"
                                    >
                                        <FiX />
                                    </button>
                                    <SelectInput
                                        label="Nueva propiedad"
                                        placeholder="Selecciona una propiedad..."
                                        options={filteredProperties}
                                        defaultValue={currentProperties.third}
                                        handleChange={changeCurrentProperty}
                                        field="third"
                                        required={true}
                                    />
                                </div>
                            )}
                            {(currentProperties.fourth || showCards > 3) && (
                                <div className="relative">
                                    <button
                                        onClick={() => {
                                            setShowCards(showCards - 1);
                                            changeCurrentProperty(
                                                "fourth",
                                                null
                                            );
                                        }}
                                        className="absolute -top-7 right-0 bg-red-500 hover:bg-red-700 text-white p-1"
                                    >
                                        <FiX />
                                    </button>
                                    <SelectInput
                                        label="Nueva propiedad"
                                        placeholder="Selecciona una propiedad..."
                                        options={filteredProperties}
                                        defaultValue={currentProperties.fourth}
                                        handleChange={changeCurrentProperty}
                                        field="fourth"
                                        required={true}
                                    />
                                </div>
                            )}
                        </div>
                        <div className="mt-4 grid grid-cols-4 gap-4">
                            <Card
                                property={getCurrentPropertyData("first")}
                                bestProperties={{
                                    cheapestSale,
                                    cheapestRent,
                                    mostBuilded,
                                    mostLand,
                                    mostOwned,
                                    mostValuableSalePerM2Own,
                                    mostValuableRentPerM2Own,
                                    mostValuableSalePerM2Build,
                                    mostValuableRentPerM2Build,
                                    mostValuableSalePerM2Land,
                                    mostValuableRentPerM2Land,
                                }}
                                filters={filters}
                            />
                            {(currentProperties.second || showCards > 1) && (
                                <Card
                                    property={getCurrentPropertyData("second")}
                                    bestProperties={{
                                        cheapestSale,
                                        cheapestRent,
                                        mostBuilded,
                                        mostLand,
                                        mostOwned,
                                        mostValuableSalePerM2Own,
                                        mostValuableRentPerM2Own,
                                        mostValuableSalePerM2Build,
                                        mostValuableRentPerM2Build,
                                        mostValuableSalePerM2Land,
                                        mostValuableRentPerM2Land,
                                    }}
                                    filters={filters}
                                />
                            )}
                            {(currentProperties.third || showCards > 2) && (
                                <Card
                                    property={getCurrentPropertyData("third")}
                                    bestProperties={{
                                        cheapestSale,
                                        cheapestRent,
                                        mostBuilded,
                                        mostLand,
                                        mostOwned,
                                        mostValuableSalePerM2Own,
                                        mostValuableRentPerM2Own,
                                        mostValuableSalePerM2Build,
                                        mostValuableRentPerM2Build,
                                        mostValuableSalePerM2Land,
                                        mostValuableRentPerM2Land,
                                    }}
                                    filters={filters}
                                />
                            )}
                            {(currentProperties.fourth || showCards > 3) && (
                                <Card
                                    property={getCurrentPropertyData("fourth")}
                                    bestProperties={{
                                        cheapestSale,
                                        cheapestRent,
                                        mostBuilded,
                                        mostLand,
                                        mostOwned,
                                        mostValuableSalePerM2Own,
                                        mostValuableRentPerM2Own,
                                        mostValuableSalePerM2Build,
                                        mostValuableRentPerM2Build,
                                        mostValuableSalePerM2Land,
                                        mostValuableRentPerM2Land,
                                    }}
                                    filters={filters}
                                />
                            )}
                            {showAddButton && (
                                <div className="flex items-center justify-center">
                                    <button
                                        onClick={() => {
                                            setShowCards(showCards + 1);
                                        }}
                                        className="h-16 w-16 pb-3 flex items-center justify-center leading-none rounded-full bg-black text-white text-6xl hover:bg-gray-700"
                                    >
                                        +
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div>
                        <button
                            className="text-white uppercase bg-black hover:bg-gray-700 px-4 py-2 font-medium text-sm"
                            onClick={() => generateURL(currentProperties)}
                        >
                            Compartir
                        </button>
                    </div>
                </div>
            )}
        </main>
    );
}
