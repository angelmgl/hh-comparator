import { useEffect } from "react";
import Accordeon from "./components/Accordeon";
import Card from "./components/Card";
import SelectInput from "./components/SelectInput";
import useProperties from "./hooks/useProperties";
import useComparator from "./hooks/useComparator";
import "./App.css";
import { getClassNames } from "./helpers";
// import html2pdf from "html2pdf.js";

function downloadPDF() {
    // var element = document.getElementById("content");
    // var opt = {
    //     margin: 4,
    //     filename: "documento.pdf",
    //     image: { type: "jpeg", quality: 0.98 },
    //     html2canvas: { scale: 5 },
    //     jsPDF: { unit: "mm", format: "a4", orientation: "landscape" },
    // };

    // // New Promise-based usage:
    // html2pdf().from(element).set(opt).save();
    window.print();
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

    const getCurrentPropertyData = (key) => {
        return properties.filter(
            (property) => property.id === currentProperties[key]
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
                <div
                    id="content"
                    className={getClassNames(
                        !filters.propertyType || !filters.operationType,
                        "not-yet",
                        "my-12 md:my-20 relative"
                    )}
                >
                    <h2 className="text-3xl font-semibold">Inmuebles</h2>
                    <div className="mt-4 grid grid-cols-4 gap-4">
                        <SelectInput
                            label="Propiedad 1"
                            placeholder="Selecciona una propiedad..."
                            options={filteredProperties}
                            defaultValue={currentProperties.first}
                            handleChange={changeCurrentProperty}
                            field="first"
                        />
                        <SelectInput
                            label="Propiedad 2"
                            placeholder="Selecciona una propiedad..."
                            options={filteredProperties}
                            defaultValue={currentProperties.second}
                            handleChange={changeCurrentProperty}
                            field="second"
                        />
                        <SelectInput
                            label="Propiedad 3"
                            placeholder="Selecciona una propiedad..."
                            options={filteredProperties}
                            defaultValue={currentProperties.third}
                            handleChange={changeCurrentProperty}
                            field="third"
                        />
                        <SelectInput
                            label="Propiedad 4"
                            placeholder="Selecciona una propiedad..."
                            options={filteredProperties}
                            defaultValue={currentProperties.fourth}
                            handleChange={changeCurrentProperty}
                            field="fourth"
                        />
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
                    </div>
                </div>
                <div>
                    <button className="text-white uppercase bg-black hover:bg-gray-700 px-4 py-2 font-medium text-sm" onClick={downloadPDF}>Descargar</button>
                </div>
            </div>
        </main>
    );
}
