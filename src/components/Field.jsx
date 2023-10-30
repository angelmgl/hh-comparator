import { FiChevronsUp } from "react-icons/fi";

function classNames(condition, classesIfTrue, defaultClasses = "") {
    return condition
        ? `${defaultClasses} ${classesIfTrue}`.trim()
        : defaultClasses;
}

export default function Field({children, condition}) {
    return (
        <p
            className={classNames(
                condition,
                "bg-green-300 text-white rounded",
                "mt-2 px-2 py-1 flex items-center leading-4"
            )}
        >
            { children }
            {condition && <FiChevronsUp className="mr-1" />}
        </p>
    );
}
