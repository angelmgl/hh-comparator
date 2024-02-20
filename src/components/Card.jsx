/* eslint-disable react/prop-types */
import { CiBadgeDollar, CiLocationOn, CiRuler, CiGrid41 } from "react-icons/ci";
import Field from "./Field";
import ShowAmenities from "./ShowAmenities";
import { useMemo } from "react";

export default function Card({ property, bestProperties, filters }) {
    const {
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
    } = bestProperties;

    const { operationType, propertyType } = filters;

    const showSalePrice = useMemo(() => {
        return operationType === "Venta" || operationType === "Venta/Alquiler";
    }, [operationType]);

    const showRentPrice = useMemo(() => {
        return (
            operationType === "Alquiler" || operationType === "Venta/Alquiler"
        );
    }, [operationType]);

    const showM2Own = useMemo(() => {
        return (
            propertyType === "Departamentos en Pozo" ||
            propertyType === "Departamentos Terminados"
        );
    }, [propertyType]);

    const showM2OwnSaleValue = useMemo(() => {
        return (
            (operationType === "Venta" || operationType === "Venta/Alquiler") &&
            (propertyType === "Departamentos en Pozo" ||
                propertyType === "Departamentos Terminados")
        );
    }, [operationType, propertyType]);

    const showM2OwnRentValue = useMemo(() => {
        return (
            (operationType === "Alquiler" ||
                operationType === "Venta/Alquiler") &&
            (propertyType === "Departamentos en Pozo" ||
                propertyType === "Departamentos Terminados")
        );
    }, [operationType, propertyType]);

    const showM2Land = useMemo(() => {
        const options = [
            "Casas",
            "Duplex",
            "Triplex",
            "Casas en Condominios",
            "Terrenos",
        ];
        return options.includes(propertyType);
    }, [propertyType]);

    const showM2LandSaleValue = useMemo(() => {
        const options = [
            "Casas",
            "Duplex",
            "Triplex",
            "Casas en Condominios",
            "Terrenos",
        ];

        return (
            options.includes(propertyType) &&
            (operationType === "Venta" || operationType === "Venta/Alquiler")
        )
    }, [propertyType, operationType])

    const showM2LandRentValue = useMemo(() => {
        const options = [
            "Casas",
            "Duplex",
            "Triplex",
            "Casas en Condominios",
            "Terrenos",
        ];

        return (
            options.includes(propertyType) &&
            (operationType === "Alquiler" || operationType === "Venta/Alquiler")
        )
    }, [propertyType, operationType])

    const showM2Build = useMemo(() => {
        const options = [
            "Casas",
            "Duplex",
            "Triplex",
            "Casas en Condominios",
        ];
        return options.includes(propertyType);
    }, [propertyType]);

    const showM2BuildSaleValue = useMemo(() => {
        const options = [
            "Casas",
            "Duplex",
            "Triplex",
            "Casas en Condominios",
        ];

        return (
            options.includes(propertyType) &&
            (operationType === "Venta" || operationType === "Venta/Alquiler")
        )
    }, [propertyType, operationType])

    const showM2BuildRentValue = useMemo(() => {
        const options = [
            "Casas",
            "Duplex",
            "Triplex",
            "Casas en Condominios",
        ];

        return (
            options.includes(propertyType) &&
            (operationType === "Alquiler" || operationType === "Venta/Alquiler")
        )
    }, [propertyType, operationType])

    if (property) {
        return (
            <div className="border border-gray-300 rounded-lg overflow-hidden my-4">
                <div
                    className="min-h-[220px] bg-center bg-cover bg-no-repeat relative"
                    style={{
                        backgroundImage: `url(${property.thumbnail})`,
                    }}
                >
                    <span className="text-xs uppercase absolute top-0 right-0 py-1 px-3 bg-black text-white">
                        {property.operationType}
                    </span>
                </div>
                <div className="p-3">
                    <h2 className="text-xl font-semibold mb-6 md:h-[120px]">
                        {property.title}
                    </h2>
                    <hr className="mb-4" />
                    {/* precio venta */}
                    {showSalePrice && (
                        <Field condition={cheapestSale === property.id} tooltip="Esta es la propiedad con precio de venta más baja">
                            <CiBadgeDollar />
                            <span className="mx-2">
                                {property.salePriceUSD
                                    ? `USD ${property.salePriceUSD.toLocaleString()}`
                                    : "N/A"}
                            </span>
                        </Field>
                    )}

                    {/* precio alquiler */}
                    {showRentPrice && (
                        <Field condition={cheapestRent === property.id} tooltip="Esta es la propiedad con precio de alquiler más baja">
                            <CiBadgeDollar />
                            <span className="mx-2">
                                {property.rentPriceUSD
                                    ? `USD ${property.rentPriceUSD.toLocaleString()} al mes`
                                    : "N/A"}
                            </span>
                        </Field>
                    )}

                    {/* ubicación */}
                    <Field condition={false}>
                        <CiLocationOn />
                        <span className="mx-2">
                            {property.locality.central ||
                                property.locality.asuncion ||
                                property.locality.cordillera ||
                                "N/A"}
                            ,&nbsp;
                            {property.zone}
                        </span>
                    </Field>
                    {/* metros propios */}
                    {showM2Own && (
                        <Field condition={mostOwned === property.id} tooltip="Esta es la propiedad más grande (metros cuadrados propios)">
                            <CiRuler />
                            <span className="mx-2">
                                {property.m2Own || "N/A"} m<sup>2</sup> propios
                            </span>
                        </Field>
                    )}
                    {/* mejor precio de venta por m2 propio */}
                    {showM2OwnSaleValue && (
                        <Field
                            condition={mostValuableSalePerM2Own === property.id}
                            tooltip="Esta es la propiedad con el precio de venta más bajo por cada metro cuadrado propio"
                        >
                            <CiGrid41 />
                            <span className="mx-2">
                                {property.m2OwnSaleValue
                                    ? `USD ${parseInt(
                                          property.m2OwnSaleValue
                                      ).toLocaleString()}`
                                    : "N/A "}
                                /m<sup>2</sup> propios
                            </span>
                        </Field>
                    )}
                    {/* mejor precio de alquiler por m2 propio */}
                    {showM2OwnRentValue && (
                        <Field
                            condition={mostValuableRentPerM2Own === property.id}
                            tooltip="Esta es la propiedad con el precio de alquiler más bajo por cada metro cuadrado propio"
                        >
                            <CiGrid41 />
                            <span className="mx-2">
                                {property.m2OwnRentValue
                                    ? `USD ${parseInt(
                                          property.m2OwnRentValue
                                      ).toLocaleString()}`
                                    : "N/A "}
                                mes x m<sup>2</sup> propios
                            </span>
                        </Field>
                    )}
                    {/* metros de terreno */}
                    {showM2Land && (
                        <Field condition={mostLand === property.id} tooltip="Esta es la propiedad con el área de terreno más grande">
                            <CiRuler />
                            <span className="mx-2">
                                {property.m2Land || "N/A"} m<sup>2</sup> de
                                terreno
                            </span>
                        </Field>
                    )}
                    {/* mejor precio de venta por m2 de terreno */}
                    {showM2LandSaleValue && (
                        <Field
                            condition={
                                mostValuableSalePerM2Land === property.id
                            }
                            tooltip="Esta es la propiedad con el precio de venta más bajo por cada metro cuadrado de terreno"
                        >
                            <CiGrid41 />
                            <span className="mx-2">
                                {
                                    property.m2LandSaleValue ? `USD ${parseInt(
                                        property.m2LandSaleValue
                                    ).toLocaleString()}` : 'N/A '
                                }
                                /m<sup>2</sup> de terreno
                            </span>
                        </Field>
                    )}
                    {/* mejor precio de alquiler por m2 de terreno */}
                    {showM2LandRentValue && (
                        <Field
                            condition={
                                mostValuableRentPerM2Land === property.id
                            }
                            tooltip="Esta es la propiedad con el precio de alquiler más bajo por cada metro cuadrado de terreno"
                        >
                            <CiGrid41 />
                            <span className="mx-2">
                                {
                                    property.m2LandRentValue ? `USD ${parseInt(
                                        property.m2LandRentValue
                                    ).toLocaleString()}` : 'N/A '
                                }
                                mes x m<sup>2</sup> de terreno
                            </span>
                        </Field>
                    )}
                    {/* metros construidos */}
                    {showM2Build && (
                        <Field condition={mostBuilded === property.id} tooltip="Esta es la propiedad con mayor cantidad de metros cuadrados construidos">
                            <CiRuler />
                            <span className="mx-2">
                                {property.m2Build || 'N/A'} m<sup>2</sup> construidos
                            </span>
                        </Field>
                    )}
                    {/* mejor precio de venta por m2 construidos */}
                    {showM2BuildSaleValue && (
                        <Field
                            condition={
                                mostValuableSalePerM2Build === property.id
                            }
                            tooltip="Esta es la propiedad con el precio de venta más bajo por cada metro cuadrado construido"
                        >
                            <CiGrid41 />
                            <span className="mx-2">
                                {
                                    property.m2BuildSaleValue ? `USD ${parseInt(
                                        property.m2BuildSaleValue
                                    ).toLocaleString()}` : 'N/A '
                                }
                                /m<sup>2</sup> construidos
                            </span>
                        </Field>
                    )}
                    {/* mejor precio de alquiler por m2 construidos */}
                    {showM2BuildRentValue && (
                        <Field
                            condition={
                                mostValuableRentPerM2Build === property.id
                            }
                            tooltip="Esta es la propiedad con el precio de alquiler más bajo por cada metro cuadrado construido"
                        >
                            <CiGrid41 />
                            <span className="mx-2">
                                {
                                    property.m2BuildRentValue ? `USD ${parseInt(
                                        property.m2BuildRentValue
                                    ).toLocaleString()}` : 'N/A '
                                }
                                mes x m<sup>2</sup> construidos
                            </span>
                        </Field>
                    )}
                    <ShowAmenities
                        title="Amenities"
                        items={property.amenities}
                    />
                    <ShowAmenities
                        title="Servicios"
                        items={property.services}
                    />
                    <ShowAmenities
                        title="Conexiones"
                        items={property.connections}
                    />
                </div>
            </div>
        );
    } else {
        return (
            <div className="min-h-[300px] border border-gray-300 border-dashed rounded-lg overflow-hidden flex items-center justify-center my-4">
                <h2 className="text-3xl font-semibold text-center text-gray-300">
                    Agrega una propiedad
                </h2>
            </div>
        );
    }
}
