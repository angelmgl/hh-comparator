import { FiCheckCircle } from "react-icons/fi";

export default function ShowAmenities({ title, items }) {
    const itemsWithTrueValue = Object.entries(items).filter(
        ([key, { value }]) => value
    );

    if (itemsWithTrueValue.length > 0) {
        return (
            <div>
                <hr className="mt-4" />
                <h2 className="py-2 uppercase font-medium">{title}:</h2>
                {itemsWithTrueValue.map(([key, { label }]) => (
                    <div key={key} className="py-1 px-2 flex items-center">
                        <FiCheckCircle className="mr-2" />
                        {label}
                    </div>
                ))}
            </div>
        );
    }
}
