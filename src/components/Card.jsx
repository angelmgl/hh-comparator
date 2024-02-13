/* eslint-disable react/prop-types */
import { CiBadgeDollar, CiLocationOn, CiRuler, CiGrid41 } from "react-icons/ci";
import Field from "./Field";
import ShowAmenities from "./ShowAmenities";

export default function Card({
    property,
    bestProperties,
    filters,
}) {
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

    const { operationType } = filters;

    if (property) {
        return (
            <div className="border border-gray-300 rounded-lg overflow-hidden">
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
                    <h2 className="text-xl font-semibold mb-6">
                        {property.title}
                    </h2>

                    {/* precio venta */}
                    {(operationType === "Venta" ||
                        operationType === "Venta/Alquiler") &&
                        property.salePriceUSD && (
                            <Field condition={cheapestSale === property.id}>
                                <CiBadgeDollar />
                                <span className="mx-2">
                                    USD {property.salePriceUSD.toLocaleString()}
                                </span>
                            </Field>
                        )}

                    {/* precio alquiler */}
                    {(operationType === "Alquiler" ||
                        operationType === "Venta/Alquiler") &&
                        property.rentPriceUSD && (
                            <Field condition={cheapestRent === property.id}>
                                <CiBadgeDollar />
                                <span className="mx-2">
                                    USD {property.rentPriceUSD.toLocaleString()} al mes
                                </span>
                            </Field>
                        )}

                    {/* ubicación */}
                    <Field condition={false}>
                        <CiLocationOn />
                        <span className="mx-2">
                            {property.locality.central ||
                                property.locality.asuncion ||
                                property.locality.cordillera}
                            ,&nbsp;
                            {property.zone}
                        </span>
                    </Field>
                    {/* metros propios */}
                    {property.m2Own && (
                        <Field condition={mostOwned === property.id}>
                            <CiRuler />
                            <span className="mx-2">
                                {property.m2Own} m<sup>2</sup> propios
                            </span>
                        </Field>
                    )}
                    {/* mejor precio de venta por m2 propio */}
                    {(operationType === "Venta" ||
                        operationType === "Venta/Alquiler") &&
                        property.m2OwnSaleValue && (
                            <Field
                                condition={
                                    mostValuableSalePerM2Own === property.id
                                }
                            >
                                <CiGrid41 />
                                <span className="mx-2">
                                    USD&nbsp;
                                    {parseInt(
                                        property.m2OwnSaleValue
                                    ).toLocaleString()}
                                    /m<sup>2</sup> propios
                                </span>
                            </Field>
                        )}
                    {/* mejor precio de alquiler por m2 propio */}
                    {(operationType === "Alquiler" ||
                        operationType === "Venta/Alquiler") &&
                        property.m2OwnRentValue && (
                            <Field
                                condition={
                                    mostValuableRentPerM2Own === property.id
                                }
                            >
                                <CiGrid41 />
                                <span className="mx-2">
                                    USD&nbsp;
                                    {parseInt(
                                        property.m2OwnRentValue
                                    ).toLocaleString()}{" "}
                                    mes x m<sup>2</sup> propios
                                </span>
                            </Field>
                        )}
                    {/* metros de terreno */}
                    {property.m2Land && (
                        <Field condition={mostLand === property.id}>
                            <CiRuler />
                            <span className="mx-2">
                                {property.m2Land} m<sup>2</sup> de terreno
                            </span>
                        </Field>
                    )}
                    {/* mejor precio de venta por m2 de terreno */}
                    {(operationType === "Venta" ||
                        operationType === "Venta/Alquiler") &&
                        property.m2LandSaleValue && (
                            <Field
                                condition={
                                    mostValuableSalePerM2Land === property.id
                                }
                            >
                                <CiGrid41 />
                                <span className="mx-2">
                                    USD&nbsp;
                                    {parseInt(
                                        property.m2LandSaleValue
                                    ).toLocaleString()}
                                    /m<sup>2</sup> de terreno
                                </span>
                            </Field>
                        )}
                    {/* mejor precio de alquiler por m2 de terreno */}
                    {(operationType === "Alquiler" ||
                        operationType === "Venta/Alquiler") &&
                        property.m2LandRentValue && (
                            <Field
                                condition={
                                    mostValuableRentPerM2Land === property.id
                                }
                            >
                                <CiGrid41 />
                                <span className="mx-2">
                                    USD&nbsp;
                                    {parseInt(
                                        property.m2LandRentValue
                                    ).toLocaleString()}
                                    &nbsp;mes x m<sup>2</sup> de terreno
                                </span>
                            </Field>
                        )}
                    {/* metros construidos */}
                    {property.m2Build && (
                        <Field condition={mostBuilded === property.id}>
                            {/* Aquí van los elementos hijos, por ejemplo: */}
                            <CiRuler />
                            <span className="mx-2">
                                {property.m2Build} m<sup>2</sup> construidos
                            </span>
                        </Field>
                    )}
                    {/* mejor precio de venta por m2 construidos */}
                    {(operationType === "Venta" ||
                        operationType === "Venta/Alquiler") &&
                        property.m2BuildSaleValue && (
                            <Field
                                condition={
                                    mostValuableSalePerM2Build === property.id
                                }
                            >
                                <CiGrid41 />
                                <span className="mx-2">
                                    USD&nbsp;
                                    {parseInt(
                                        property.m2BuildSaleValue
                                    ).toLocaleString()}
                                    /m<sup>2</sup> construidos
                                </span>
                            </Field>
                        )}
                    {/* mejor precio de alquiler por m2 construidos */}
                    {(operationType === "Alquiler" ||
                        operationType === "Venta/Alquiler") &&
                        property.m2BuildRentValue && (
                            <Field
                                condition={
                                    mostValuableRentPerM2Build === property.id
                                }
                            >
                                <CiGrid41 />
                                <span className="mx-2">
                                    USD&nbsp;
                                    {parseInt(
                                        property.m2BuildRentValue
                                    ).toLocaleString()}
                                    &nbsp;mes x m<sup>2</sup> construidos
                                </span>
                            </Field>
                        )}
                        <hr className="mt-4" />
                        <ShowAmenities title="Amenities" items={property.amenities} />
                        <hr className="mt-4" />
                        <ShowAmenities title="Servicios" items={property.services} />
                        <hr className="mt-4" />
                        <ShowAmenities title="Conexiones" items={property.connections} />
                </div>
            </div>
        );
    } else {
        return (
            <div className="min-h-[300px] border border-gray-300 border-dashed rounded-lg overflow-hidden flex items-center justify-center">
                <h2 className="text-3xl font-semibold text-center text-gray-300">
                    Agrega una propiedad
                </h2>
            </div>
        );
    }
}
