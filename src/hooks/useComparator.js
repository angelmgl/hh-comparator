import { useState } from "react";

export default function useComparator(currentPropertyType) {
    const [currentProperties, setCurrentProperties] = useState({
        first: null,
        second: null,
        third: null,
        fourth: null,
    }); 

    function hasTwoOrMoreValues(properties) {
        const values = Object.values(properties);
        const countNonNull = values.filter(value => value !== null).length;
    
        return countNonNull >= 2;
    }

    return {
        currentProperties,
        setCurrentProperties
    }
}