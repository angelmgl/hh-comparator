export function mapProperties(properties) {
    let mappedProperties = properties.map((item) => {
        return {
            id: item.ID,
            title: item.title,
            thumbnail: item.thumbnail,
            code: item.codigo,
            zone: item.zona,
            locality: {
                central: item.ciudad_central,
                cordillera: item.ciudad_cordillera,
                asuncion: item.barrio_asuncion,
            },
            operationType: item.tipo_operacion,
            propertyType: item.tipo_propiedad,
            salePriceUSD: item.precio_venta_usd,
            salePriceGS: item.precio_venta_gs,
            rentPriceUSD: item.precio_alquiler_usd,
            rentPriceGS: item.precio_alquiler_gs,
            dimensions: item.dimensiones,
            rooms: item.cantidad_de_habitaciones,
            bathrooms: item.cantidad_de_banos,
            floors: item.cantidad_de_pisos,
            m2Build: item.m2_construccion,
            m2Land: item.m2_terreno,
            m2Own: item.m2_propios,
            hasPool: item.piscina === "Si",
            hasBaul: item.baulera === "Si",
            hasAscensor: item.ascensor === "Si",
            amenities: {
                pool: item.amenities["Piscina"] === "true",
                gym: item.amenities["Gimnasio"] === "true",
                quincho: item.amenities["Quincho"] === "true",
                laundry: item.amenities["Lavanderia"] === "true",
                garden: item.amenities["Jardin"] === "true",
            },
            services: {
                portero24hs: item.amenities["Portero 24hs"] === "true",
                generator: item.amenities["Generador"] === "true",
                petFriendly: item.amenities["Pet Friendly"] === "true",
                coworking: item.amenities["Co-working"] === "true",
            },
            conections: {
                water: item.amenities["Conexión de agua"] === "true",
                electricity: item.amenities["Conexion electrica"] === "true",
                none: item.amenities["Ninguna"] === "true",
            },
        };
    });

    return mappedProperties;
}

export function getUniqueOperationTypes(properties) {
    return properties
        .map((item) => item.operationType)
        .filter((value, index, self) => self.indexOf(value) === index)
        .map((item) => {
            return {
                label: item,
                value: item,
            };
        });
}

export function getUniquePropertyTypes(properties) {
    return properties
        .map((item) => item.propertyType)
        .filter((value, index, self) => self.indexOf(value) === index)
        .map((item) => {
            return {
                label: item,
                value: item,
            };
        });
}

export function getUniqueZones(properties) {
    return properties
        .map((item) => item.zone)
        .filter((value, index, self) => self.indexOf(value) === index)
        .map((item) => {
            return {
                label: item,
                value: item,
            };
        });
}

export function getUniqueLocalities(properties) {
    // Primero, extraemos todos los valores de las propiedades central, cordillera y asuncion en un solo array
    const allLocals = properties.reduce((acc, item) => {
        if (item.locality.central)
            acc.push({
                city: item.locality.central,
                zone: item.zone,
            });
        if (item.locality.cordillera)
            acc.push({
                city: item.locality.cordillera,
                zone: item.zone,
            });
        if (item.locality.asuncion)
            acc.push({
                city: item.locality.asuncion,
                zone: item.zone,
            });
        return acc;
    }, []);

    // Filtramos ese array para obtener valores únicos
    return allLocals.filter((item, index, self) => {
        return (
            index === self.findIndex((obj) => {
                return JSON.stringify(obj) === JSON.stringify(item);
            })
        );
    });
}

export function matchesFilter(property, filters) {
    if (
        filters.propertyType &&
        property.propertyType !== filters.propertyType
    ) {
        return false;
    }

    if (
        filters.operationType &&
        property.operationType !== filters.operationType
    ) {
        return false;
    }

    if (filters.zone && property.zone !== filters.zone) {
        return false;
    }

    // Filtro por localidad
    if (filters.local) {
        const hasMatchedLocal = Object.values(property.locality).includes(filters.local);
        if (!hasMatchedLocal) {
            return false;
        }
    }

    // Filtrado de precios, puedes ajustarlo según necesites
    if (property.operationType === "venta") {
        if (
            property.salePriceUSD < filters.price.from ||
            property.salePriceUSD > filters.price.to
        ) {
            return false;
        }
    } else {
        // Lógica para filtrar por rentPriceUSD o rentPriceGS si es necesario
        // Por ejemplo:
        // if (
        //     property.rentPriceUSD < filters.price.from ||
        //     property.rentPriceUSD > filters.price.to
        // ) {
        //     return false;
        // }
    }

    return true; // Si pasa todos los filtros, devolvemos true.
}

