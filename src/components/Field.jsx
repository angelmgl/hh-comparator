import { useEffect, useState } from "react";
import { FiChevronsUp } from "react-icons/fi";

function classNames(condition, classesIfTrue, defaultClasses = "") {
    return condition
        ? `${defaultClasses} ${classesIfTrue}`.trim()
        : defaultClasses;
}

export default function Field({children, condition, tooltip}) {
    const [isTooltipVisible, setIsTooltipVisible] = useState(false);

    useEffect(() => {
        setTimeout(() =>{
            setIsTooltipVisible(false);
        }, 2000);
    }, [isTooltipVisible]);

    return (
    <div className="relative">
        {isTooltipVisible && (
        <p 
            onClick={() => setIsTooltipVisible(!isTooltipVisible)}
            className="tooltip cursor-pointer absolute -top-16 p-2 rounded-sm bg-white shadow-md text-xs"
        >
            {condition ? tooltip : ""}
        </p>
        )}
        <p
            onClick={() => setIsTooltipVisible(!isTooltipVisible)}
            className={classNames(
                condition,
                "bg-[#397F68] text-white rounded cursor-pointer",
                "mt-2 px-2 py-1 flex items-center leading-4 text-sm single-line-text"
            )}
        >
            { children }
            {condition && <FiChevronsUp className="mr-1" />}
        </p>
    </div>
    );
}
