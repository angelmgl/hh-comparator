import { FiChevronsUp } from "react-icons/fi";

function classNames(condition, classesIfTrue, defaultClasses = "") {
    return condition
        ? `${defaultClasses} ${classesIfTrue}`.trim()
        : defaultClasses;
}

export default function Field({children, condition, tooltip}) {
    return (
        <p
            className={classNames(
                condition,
                "bg-[#397F68] text-white rounded",
                "mt-2 px-2 py-1 flex items-center leading-4 text-sm single-line-text"
            )}
            title={condition ? tooltip : ''}
        >
            { children }
            {condition && <FiChevronsUp className="mr-1" />}
        </p>
    );
}
