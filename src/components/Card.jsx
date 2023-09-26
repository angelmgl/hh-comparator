/* eslint-disable react/prop-types */

export default function Card({ property, handleChange, field }) {
    if (property) {
        return (
            <div className="border border-gray-300 rounded-lg overflow-hidden">
                <div
                    className="min-h-[220px] bg-center bg-cover bg-no-repeat relative"
                    style={{
                        backgroundImage: `url(${property.thumbnail})`,
                    }}
                >
                    <span
                        className="flex justify-center items-center h-5 w-5 bg-red-600 hover:bg-red-700 text-white cursor-pointer"
                        onClick={() => handleChange(field, null)}
                    >
                        x
                    </span>
                </div>
                <div className="p-3">
                    <h2 className="text-xl font-semibold text-center">
                        {property.title}
                    </h2>
                    <p className="mt-2">
                        <strong>Precio:</strong>&nbsp;
                        <span>USD {property.salePriceUSD}</span>
                    </p>
                    <p className="mt-2">
                        <strong>Zona:</strong>&nbsp;
                        <span>{property.zone}</span>
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
