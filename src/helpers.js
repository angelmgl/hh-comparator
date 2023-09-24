export function mapProperties(properties) {
    let mappedProperties = properties.map(item => {
        return {
            id: item.ID,
            title: item.title,
            thumbnail: item.thumbnail,
            code: item.codigo,
            zone: item.zona,
            cityCentral: item.ciudad_central,
            cityCordillera: item.ciudad_cordillera,
            barrioAsuncion: item.barrio_asuncion,
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
            }
        }
    });

    return mappedProperties;
}