import { useState, useEffect } from "react";
import {
    mapProperties,
    matchesFilter,
    getUniqueOperationTypes,
    getUniquePropertyTypes,
    getUniqueZones,
    getUniqueLocalities,
} from "../helpers";

export default function useProperties() {
    const [properties, setProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [filters, setFilters] = useState({
        propertyType: null,
        operationType: null,
        zone: null,
        local: null,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [localities, setLocalities] = useState([]);
    const [propertyTypeOptions, setPropertyTypeOptions] = useState([]);
    const [operationTypeOptions, setOperationTypeOptions] = useState([]);
    const [zoneOptions, setZoneOptions] = useState([]);
    const [localityOptions, setLocalityOptions] = useState([]);

    const changeFilters = (key, value) => {
        setFilters((prev) => {
            return {
                ...prev,
                [key]: value,
            };
        });
    };

    // efecto para traer las propiedades de la API
    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await fetch(
                    "https://homehunters.com.py/wp-json/comparador/v1/propiedades"
                );
                const result = await response.json();
                const mapped = mapProperties(result);
                setProperties(mapped);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchProperties();
    }, []);

    // efecto para filtrar las propiedades cada vez que cambian los filtros
    useEffect(() => {
        const filtered = properties.filter((property) =>
            matchesFilter(property, filters)
        );
        const options = filtered.map((property) => ({
            label: property.title,
            value: property.id,
        }));
        setFilteredProperties(options);
    }, [properties, filters]);

    // efecto para setear las opciones de los filtros
    useEffect(() => {
        const uniqueOperationTypes = getUniqueOperationTypes(properties);
        setOperationTypeOptions(uniqueOperationTypes);
        changeFilters("operationType", operationTypeOptions[0]?.value);

        const uniquePropertyTypes = getUniquePropertyTypes(properties);
        setPropertyTypeOptions(uniquePropertyTypes);
        changeFilters("propertyType", propertyTypeOptions[0]?.value);

        setZoneOptions(getUniqueZones(properties));
        setLocalities(getUniqueLocalities(properties));
    }, [properties]);

    // efecto para mostrar las localidades según la zona
    useEffect(() => {
        if (filters.zone) {
            setLocalityOptions(
                localities
                    .filter((locality) => locality.zone === filters.zone)
                    .map((locality) => ({
                        label: locality.city,
                        value: locality.city,
                    }))
            );
        } else {
            setFilters((prev) => {
                return {
                    ...prev,
                    local: null,
                };
            });
            setLocalityOptions([]);
        }
    }, [filters.zone, localities]);

    const getFiltersFromURL = () => {
        // Crear un objeto URL usando window.location para acceder a la URL actual
        const url = new URL(window.location);

        // Utilizar URLSearchParams para obtener los parámetros de la URL
        const searchParams = new URLSearchParams(url.search);

        const propertyType = searchParams.get("propertyType");
        const operationType = searchParams.get("operationType");
        const zone = searchParams.get("zone");
        const local = searchParams.get("local");

        if (propertyType && operationType) {
            // Crear un objeto temporal para almacenar los parámetros encontrados
            const params = {
                propertyType: propertyType,
                operationType: operationType,
                zone: zone,
                local: local,
            };

            // Actualizar el estado con los valores de los parámetros, si existen
            setFilters((prevState) => ({
                ...prevState,
                ...params,
            }));
        }
    };

    return {
        properties,
        loading,
        error,
        filteredProperties,
        setFilteredProperties,
        filters,
        changeFilters,
        propertyTypeOptions,
        operationTypeOptions,
        zoneOptions,
        localityOptions,
        getFiltersFromURL,
    };
}
