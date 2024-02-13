import { useEffect, useState } from "react";
import {
    getTheCheapestSale,
    getTheCheapestRent,
    getTheMostBuilded,
    getTheMostLand,
    getTheMostOwned,
    getTheMostValuableRentPerM2Build,
    getTheMostValuableRentPerM2Own,
    getTheMostValuableRentPerM2Land,
    getTheMostValuableSalePerM2Build,
    getTheMostValuableSalePerM2Own,
    getTheMostValuableSalePerM2Land,
} from "../../comparators";

export default function useComparator(properties, filters) {
    const [currentProperties, setCurrentProperties] = useState({
        first: null,
        two: null,
        third: null,
        fourth: null,
    });
    const [hasTwoOrMoreValues, setHasTwoOrMoreValues] = useState(false);
    const [cheapestSale, setCheapestSale] = useState(null);
    const [cheapestRent, setCheapestRent] = useState(null);
    const [mostBuilded, setMostBuilded] = useState(null);
    const [mostLand, setMostLand] = useState(null);
    const [mostOwned, setMostOwned] = useState(null);
    const [mostValuableSalePerM2Own, setMostValuableSalePerM2Own] =
        useState(null);
    const [mostValuableRentPerM2Own, setMostValuableRentPerM2Own] =
        useState(null);
    const [mostValuableSalePerM2Build, setMostValuableSalePerM2Build] =
        useState(null);
    const [mostValuableRentPerM2Build, setMostValuableRentPerM2Build] =
        useState(null);
    const [mostValuableSalePerM2Land, setMostValuableSalePerM2Land] =
        useState(null);
    const [mostValuableRentPerM2Land, setMostValuableRentPerM2Land] =
        useState(null);

    // efecto para calcular todos los valores destacados al cambiar las propiedades seleccionadas o los filtros
    useEffect(() => {
        setCheapestSale(
            getTheCheapestSale(
                hasTwoOrMoreValues,
                properties,
                currentProperties,
                filters.operationType
            )
        );
        setCheapestRent(
            getTheCheapestRent(
                hasTwoOrMoreValues,
                properties,
                currentProperties,
                filters.operationType
            )
        );
        setMostBuilded(
            getTheMostBuilded(hasTwoOrMoreValues, properties, currentProperties)
        );
        setMostLand(
            getTheMostLand(hasTwoOrMoreValues, properties, currentProperties)
        );
        setMostOwned(
            getTheMostOwned(hasTwoOrMoreValues, properties, currentProperties)
        );
        setMostValuableSalePerM2Own(
            getTheMostValuableSalePerM2Own(
                hasTwoOrMoreValues,
                properties,
                currentProperties
            )
        );
        setMostValuableSalePerM2Build(
            getTheMostValuableSalePerM2Build(
                hasTwoOrMoreValues,
                properties,
                currentProperties
            )
        );
        setMostValuableSalePerM2Land(
            getTheMostValuableSalePerM2Land(
                hasTwoOrMoreValues,
                properties,
                currentProperties
            )
        );
        setMostValuableRentPerM2Own(
            getTheMostValuableRentPerM2Own(
                hasTwoOrMoreValues,
                properties,
                currentProperties
            )
        );
        setMostValuableRentPerM2Build(
            getTheMostValuableRentPerM2Build(
                hasTwoOrMoreValues,
                properties,
                currentProperties
            )
        );
        setMostValuableRentPerM2Land(
            getTheMostValuableRentPerM2Land(
                hasTwoOrMoreValues,
                properties,
                currentProperties
            )
        );
    }, [currentProperties, hasTwoOrMoreValues, properties, filters]);

    // efecto para saber si hay 2 o más propiedades
    useEffect(() => {
        const values = Object.values(currentProperties);
        const countNonNull = values.filter((value) => value !== null).length;

        setHasTwoOrMoreValues(countNonNull >= 2);
    }, [currentProperties]);

    // efecto para reordenar los currentProperties
    useEffect(() => {
        // Función para reordenar currentProperties
        const reorderProperties = (properties) => {
            const values = Object.values(properties);
            const sortedValues = values
                .filter((value) => value !== null)
                .concat(values.filter((value) => value === null));

            return {
                first: sortedValues[0] || null,
                two: sortedValues[1] || null,
                third: sortedValues[2] || null,
                fourth: sortedValues[3] || null,
            };
        };

        // Calcular el nuevo estado reordenado
        const newProperties = reorderProperties(currentProperties);

        // Convertir los objetos a string para comparar
        const currentAsString = JSON.stringify(currentProperties);
        const newAsString = JSON.stringify(newProperties);

        // Actualizar el estado solo si el reordenamiento cambia el objeto
        if (currentAsString !== newAsString) {
            setCurrentProperties(newProperties);
        }
    }, [currentProperties]);

    const getPropertiesFromURL = () => {
        // Crear un objeto URL usando window.location para acceder a la URL actual
        const url = new URL(window.location);

        // Utilizar URLSearchParams para obtener los parámetros de la URL
        const searchParams = new URLSearchParams(url.search);

        // Crear un objeto temporal para almacenar los parámetros encontrados
        const params = {
            first: searchParams.get("first"),
            two: searchParams.get("two"),
            third: searchParams.get("third"),
            fourth: searchParams.get("fourth"),
        };

        // Actualizar el estado con los valores de los parámetros, si existen
        setCurrentProperties((prevState) => ({
            ...prevState,
            ...params,
        }));
    };

    return {
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
        hasTwoOrMoreValues,
        getPropertiesFromURL,
    };
}
