/* eslint-disable react/prop-types */
import {
    CiBadgeDollar,
    CiLocationOn,
    CiRuler,
} from "react-icons/ci";
import { FiX, FiChevronsUp } from "react-icons/fi";

function classNames(condition, classesIfTrue, defaultClasses = '') {
    return condition ? `${defaultClasses} ${classesIfTrue}`.trim() : defaultClasses;
  }

export default function Card({
    property,
    handleChange,
    field,
    cheapest,
    mostBuilded,
    mostLand,
    mostOwned,
}) {
    if (property) {
        const finalPrice = property.salePriceUSD
            ? property.salePriceUSD.toLocaleString()
            : property.rentPriceUSD.toLocaleString();

        return (
            <div className="border border-gray-300 rounded-lg overflow-hidden">
                <div
                    className="min-h-[220px] bg-center bg-cover bg-no-repeat relative"
                    style={{
                        backgroundImage: `url(${property.thumbnail})`,
                    }}
                >
                    <span
                        className="flex justify-center items-center h-6 w-6 bg-red-600 hover:bg-red-700 text-white cursor-pointer"
                        onClick={() => handleChange(field, null)}
                    >
                        <FiX />
                    </span>
                    <span className="text-xs uppercase absolute top-0 right-0 py-1 px-3 bg-black text-white">
                        {property.operationType}
                    </span>
                </div>
                <div className="p-3">
                    <h2 className="text-xl font-semibold text-center">
                        {property.title}
                    </h2>
                    {/* precio */}
                    <p className={classNames(cheapest === property.code, "bg-green-300 text-white px-2 rounded", "mt-2 flex items-center")}>
                        <CiBadgeDollar />
                        <span className="mx-2">USD {finalPrice}</span>
                        {cheapest === property.code ? (
                            <FiChevronsUp className="mr-1" />
                        ) : (
                            ""
                        )}
                    </p>
                    {/* ubicación */}
                    <p className="mt-2 flex items-center">
                        <CiLocationOn />
                        <span className="mx-2">
                            {property.locality.central ||
                                property.locality.asuncion ||
                                property.locality.cordillera}
                            ,&nbsp;
                            {property.zone}
                        </span>
                    </p>
                    {/* metros propios */}
                    {property.m2Own && (
                        <p className={classNames(mostOwned === property.code, "bg-green-300 text-white px-2 rounded", "mt-2 flex items-center")}>
                            <CiRuler />
                            <span className="mx-2">
                                {property.m2Own} m<sup>2</sup> propios
                            </span>
                            {mostOwned === property.code ? (
                                <FiChevronsUp className="mr-1" />
                            ) : (
                                ""
                            )}
                        </p>
                    )}
                    {/* metros de terreno */}
                    {property.m2Land && (
                        <p className={classNames(mostLand === property.code, "bg-green-300 text-white px-2 rounded", "mt-2 flex items-center")}>
                            <CiRuler />
                            <span className="mx-2">
                                {property.m2Land} m<sup>2</sup> de terreno
                            </span>
                            {mostLand === property.code ? (
                                <FiChevronsUp className="mr-1" />
                            ) : (
                                ""
                            )}
                        </p>
                    )}
                    {/* metros construidos */}
                    {property.m2Build && (
                        <p className={classNames(mostBuilded === property.code, "bg-green-300 text-white px-2 rounded", "mt-2 flex items-center")}>
                            <CiRuler />
                            <span className="mx-2">
                                {property.m2Build} m<sup>2</sup> construidos
                            </span>
                            {mostBuilded === property.code ? (
                                <FiChevronsUp className="mr-1" />
                            ) : (
                                ""
                            )}
                        </p>
                    )}
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
