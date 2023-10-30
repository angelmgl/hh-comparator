/* eslint-disable react/prop-types */
import { CiCircleChevUp, CiBadgeDollar, CiLocationOn } from "react-icons/ci";

function Signal({ text }) {
    return (
        <span className="bg-green-300 text-white px-2 rounded text-xs flex items-center">
            <CiCircleChevUp className="mr-1" /> {text}
        </span>
    )
}

export default function Card({ property, handleChange, field, cheapest }) {
    if (property) {
        const finalPrice = property.salePriceUSD ? property.salePriceUSD.toLocaleString() : property.rentPriceUSD.toLocaleString()

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
                        x
                    </span>
                    <span className="text-xs uppercase absolute top-0 right-0 py-1 px-3 bg-black text-white">{property.operationType}</span>
                </div>
                <div className="p-3">
                    <h2 className="text-xl font-semibold text-center">
                        {property.title}
                    </h2>
                    <p className="mt-2 flex items-center">
                        <CiBadgeDollar />
                        <span className="mx-2">USD {finalPrice}</span>
                        {
                            cheapest === property.code ? <Signal text="El más barato" /> : ""
                        }
                    </p>
                    <p className="mt-2 flex items-center">
                        <CiLocationOn />
                        <span className="mx-2">{property.zone}</span>
                    </p>
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
