import { useEffect, useState } from "react";
import Accordeon from "./components/Accordeon";
import Card from "./components/Card";
import SelectInput from "./components/SelectInput";
import useProperties from "./hooks/useProperties";
import useComparator from "./hooks/useComparator";
import { FiX } from "react-icons/fi";
import "./App.css";
// import { getClassNames } from "./helpers";
// getClassNames(
//     !filters.propertyType || !filters.operationType,
import html2pdf from "html2pdf.js";

function downloadPDF() {
    var element = document.getElementById("content");
    var opt = {
        margin: 4,
        filename: "documento.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 5 },
        jsPDF: { unit: "mm", format: "a4", orientation: "landscape" },
    };

    // New Promise-based usage:
    html2pdf().from(element).set(opt).save();
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

    const [showCards, setShowCards] = useState(1);

    const [showAddButton, setShowAddButton] = useState(true);

    useEffect(() => setShowAddButton(showCards < 4), [showCards]);

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
                        />
                        {(currentProperties.second || showCards > 1) && (
                            <div className="relative">
                                <button
                                    onClick={() => {
                                        setShowCards(showCards - 1);
                                        changeCurrentProperty("second", null);
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
                                />
                            </div>
                        )}
                        {(currentProperties.third || showCards > 2) && (
                            <div className="relative">
                                <button
                                    onClick={() => {
                                        setShowCards(showCards - 1);
                                        changeCurrentProperty("third", null);
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
                                />
                            </div>
                        )}
                        {(currentProperties.fourth || showCards > 3) && (
                            <div className="relative">
                                <button
                                    onClick={() => {
                                        setShowCards(showCards - 1);
                                        changeCurrentProperty("fourth", null);
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
                                />
                            </div>
                        )}
                    </div>
                    <div className="mt-4 grid grid-cols-4 gap-4">
                        <Card
                            property={getCurrentPropertyData("first")}
                            handleChange={changeCurrentProperty}
                            field="first"
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
                                handleChange={changeCurrentProperty}
                                field="second"
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
                                handleChange={changeCurrentProperty}
                                field="third"
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
                                handleChange={changeCurrentProperty}
                                field="fourth"
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
                                    onClick={() => setShowCards(showCards + 1)}
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
                        onClick={downloadPDF}
                    >
                        Descargar
                    </button>
                </div>
            </div>
        </main>
    );
}
