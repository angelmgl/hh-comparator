function formatNumber(number) {
    let int = parseInt(number);

    return int ? int : null;
}

export function mapProperties(properties) {
    let mappedProperties = properties.map((item) => {
        const salePriceUSD = formatNumber(item.precio_venta_usd);
        const rentPriceUSD = formatNumber(item.precio_alquiler_usd);
        const m2Build = formatNumber(item.m2_construccion);
        const m2Land = formatNumber(item.m2_terreno);
        const m2Own = formatNumber(item.m2_propios);

        const m2BuildSaleValue = m2Build && salePriceUSD !== null ? salePriceUSD / m2Build : null;
        const m2LandSaleValue = m2Land && salePriceUSD !== null ? salePriceUSD / m2Land : null;
        const m2OwnSaleValue = m2Own && salePriceUSD !== null ? salePriceUSD / m2Own : null;
        const m2BuildRentValue = m2Build && rentPriceUSD !== null ? rentPriceUSD / m2Build : null;
        const m2LandRentValue = m2Land && rentPriceUSD !== null ? rentPriceUSD / m2Land : null;
        const m2OwnRentValue = m2Own && rentPriceUSD !== null ? rentPriceUSD / m2Own : null;

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
            salePriceUSD,
            salePriceGS: formatNumber(item.precio_venta_gs),
            rentPriceUSD,
            rentPriceGS: formatNumber(item.precio_alquiler_gs),
            dimensions: item.dimensiones,
            rooms: item.cantidad_de_habitaciones,
            bathrooms: item.cantidad_de_banos,
            floors: item.cantidad_de_pisos,
            m2Build,
            m2Land,
            m2Own,
            m2BuildSaleValue,
            m2LandSaleValue,
            m2OwnSaleValue,
            m2BuildRentValue,
            m2LandRentValue,
            m2OwnRentValue,
            hasPool: item.piscina === "Si",
            hasBaul: item.baulera === "Si",
            hasAscensor: item.ascensor === "Si",
            amenities: {
                pool: item.amenities["Piscina"] === "true",
                gym: item.amenities["Gimnasio"] === "true",
                quinchoCC: item.amenities["Quincho climatizado"] === "true",
                quinchoOutside: item.amenities["Quincho al aire libre"] === "true",
                laundry: item.amenities["Laundry"] === "true",
                garden: item.amenities["Jardin"] === "true",
                winery: item.amenities["Cava de vinos"] === "true",
                restaurant: item.amenities["Restaurant"] === "true",
                drySauna: item.amenities["Sauna seco"] === "true",
                steamSauna: item.amenities["Sauna húmedo"] === "true",
                yogaArea: item.amenities["Área de yoga"] === "true",
                hairSalon: item.amenities["Peluquería"] === "true",
                spa: item.amenities["Spá"] === "true",
                cinemaRoom: item.amenities["Sala de cine"] === "true",
                kidsRoom: item.amenities["Sala de niños"] === "true",
                teenagersRoom: item.amenities["Sala de adolescentes"] === "true",
                coWorkingSpace: item.amenities["Sala de Co-working"] === "true"
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

export function getClassNames(condition, conditionalClass, defaultClasses) {
    return condition ? `${conditionalClass} ${defaultClasses}` : defaultClasses;
}
