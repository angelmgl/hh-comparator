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
        price: {
            from: 0,
            to: Number.MAX_SAFE_INTEGER,
        },
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [localities, setLocalities] = useState([]);
    const [propertyTypeOptions, setPropertyTypeOptions] = useState([]);
    const [operationTypeOptions, setOperationTypeOptions] = useState([]);
    const [zoneOptions, setZoneOptions] = useState([]);
    const [localityOptions, setLocalityOptions] = useState([]);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await fetch(
                    "https://homehunters.idealscloud.uk/wp-json/comparador/v1/propiedades"
                );
                const result = await response.json();
                setProperties(mapProperties(result));
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchProperties();
    }, []);

    useEffect(() => {
        const filtered = properties.filter((property) =>
            matchesFilter(property, filters)
        );
        const options = filtered.map((property) => ({
            label: property.title,
            value: property.code,
        }));
        setFilteredProperties(options);
    }, [properties, filters]);

    useEffect(() => {
        setOperationTypeOptions(getUniqueOperationTypes(properties));
        setPropertyTypeOptions(getUniquePropertyTypes(properties));
        setZoneOptions(getUniqueZones(properties));
        setLocalities(getUniqueLocalities(properties));
    }, [properties]);

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

    const changeFilters = (key, value) => {
        setFilters((prev) => {
            return {
                ...prev,
                [key]: value,
            };
        });
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
    };
}
