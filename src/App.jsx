import { useEffect, useState } from "react";
import Accordeon from "./components/Accordeon";
import Card from "./components/Card";
import SelectInput from "./components/SelectInput";
import useProperties from "./hooks/useProperties";
import useComparator from "./hooks/useComparator";
import { FiX, FiPlus } from "react-icons/fi";
import "./App.css";
import Snackbar from "./components/Snackbar";

function generateURL(currentProperties, filters) {
    const APP_URL = "https://homehunters.com.py/comparador";

    // Fusionar currentProperties y filters en un solo objeto
    const combinedItems = { ...currentProperties, ...filters };

    // Crear un array con los pares clave-valor que no sean null
    const queryParams = Object.entries(combinedItems).reduce(
        (acc, [key, value]) => {
            if (value !== null) {
                acc.push(
                    `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
                );
            }
            return acc;
        },
        []
    );

    // Unir los pares clave-valor con '&' y concatenarlos a la URL base
    const urlWithParams = `${APP_URL}/?${queryParams.join("&")}`;

    // Copiar la URL al portapapeles
    navigator.clipboard.writeText(urlWithParams);
}

export default function App() {
    const {
        properties,
        filteredProperties,
        filters,
        loading,
        changeFilters,
        operationTypeOptions,
        propertyTypeOptions,
        zoneOptions,
        localityOptions,
        getFiltersFromURL,
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
        getPropertiesFromURL,
    } = useComparator(properties, filters);

    useEffect(() => {
        setCurrentProperties({
            first: null,
            two: null,
            third: null,
            fourth: null,
        });
    }, [filters, setCurrentProperties]);

    const [showSnackbar, setShowSnackbar] = useState(false);
    const [showCards, setShowCards] = useState(1);
    const [showAddButton, setShowAddButton] = useState(true);

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

    // efecto para cerrar el snackbar automáticamente luego de 2 segundos
    useEffect(() => {
        if (showSnackbar) {
            const timer = setTimeout(() => setShowSnackbar(false), 2000);

            // Función de limpieza que cancela el temporizador
            return () => clearTimeout(timer);
        }
    }, [showSnackbar]);

    // efecto para recuperar las propiedades de la URL
    useEffect(() => {
        if (!loading) {
            setTimeout(() => {
                getFiltersFromURL();
                setTimeout(() => getPropertiesFromURL(), 500);
            }, 500);
        }
    }, [loading]);

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
            {loading && (
                <div className="w-full h-96 flex items-center justify-center">
                    <span className="loader"></span>
                </div>
            )}
            {!loading && (
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
                        <div className="mt-4 md:grid md:grid-cols-4 gap-4">
                            <div>
                                <SelectInput
                                    label="Nueva propiedad"
                                    placeholder="Selecciona una propiedad..."
                                    options={filteredProperties}
                                    defaultValue={currentProperties.first}
                                    handleChange={changeCurrentProperty}
                                    field="first"
                                    required={true}
                                />
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
                            </div>
                            {(currentProperties.two || showCards > 1) && (
                                <div className="mt-16 md:mt-0">
                                    <div className="relative">
                                        <button
                                            onClick={() => {
                                                setShowCards(showCards - 1);
                                                changeCurrentProperty(
                                                    "two",
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
                                            defaultValue={currentProperties.two}
                                            handleChange={changeCurrentProperty}
                                            field="two"
                                            required={true}
                                        />
                                    </div>
                                    <Card
                                        property={getCurrentPropertyData("two")}
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
                            )}
                            {(currentProperties.third || showCards > 2) && (
                                <div className="mt-16 md:mt-0">
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
                                            defaultValue={
                                                currentProperties.third
                                            }
                                            handleChange={changeCurrentProperty}
                                            field="third"
                                            required={true}
                                        />
                                    </div>
                                    <Card
                                        property={getCurrentPropertyData(
                                            "third"
                                        )}
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
                            )}
                            {(currentProperties.fourth || showCards > 3) && (
                                <div className="mt-16 md:mt-0">
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
                                            defaultValue={
                                                currentProperties.fourth
                                            }
                                            handleChange={changeCurrentProperty}
                                            field="fourth"
                                            required={true}
                                        />
                                    </div>
                                    <Card
                                        property={getCurrentPropertyData(
                                            "fourth"
                                        )}
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
                            )}
                            {showAddButton && (
                                <div className="flex items-center justify-center">
                                    <button
                                        onClick={() => {
                                            setShowCards(showCards + 1);
                                        }}
                                        className="h-16 w-16 flex items-center justify-center leading-none rounded-full bg-black text-white hover:bg-gray-700"
                                    >
                                        <FiPlus size={35} />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div>
                        <button
                            className="text-white uppercase bg-black hover:bg-gray-700 px-4 py-2 font-medium text-sm"
                            onClick={() => {
                                generateURL(currentProperties, filters);
                                setShowSnackbar(true);
                            }}
                        >
                            Compartir
                        </button>
                    </div>
                </div>
            )}
            {showSnackbar && (
                <Snackbar
                    text="URL copiada al portapapeles!"
                    close={() => setShowSnackbar(false)}
                />
            )}
        </main>
    );
}
