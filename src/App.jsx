import { useEffect } from "react";
import Accordeon from "./components/Accordeon";
import Card from "./components/Card";
import SelectInput from "./components/SelectInput";
import useProperties from "./hooks/useProperties";
import useComparator from "./hooks/useComparator";
import "./App.css";
import { getClassNames } from "./helpers";

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
        cheapest
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
            (property) => property.code === currentProperties[key]
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
                            cheapest={cheapest}
                            filters={filters}
                        />
                        <Card
                            property={getCurrentPropertyData("second")}
                            handleChange={changeCurrentProperty}
                            field="second"
                            cheapest={cheapest}
                            filters={filters}
                        />
                        <Card
                            property={getCurrentPropertyData("third")}
                            handleChange={changeCurrentProperty}
                            field="third"
                            cheapest={cheapest}
                            filters={filters}
                        />
                        <Card
                            property={getCurrentPropertyData("fourth")}
                            handleChange={changeCurrentProperty}
                            field="fourth"
                            cheapest={cheapest}
                            filters={filters}
                        />
                    </div>
                </div>
            </div>
        </main>
    );
}
