import { useState } from "react";

export default function useComparator(currentPropertyType) {
    const [currentProperties, setCurrentProperties] = useState({
        first: null,
        second: null,
        third: null,
        fourth: null,
    }); 
    const [cheapestSale, setCheapestSale] = useState(null);

    function hasTwoOrMoreValues() {
        const values = Object.values(currentProperties);
        const countNonNull = values.filter(value => value !== null).length;
    
        return countNonNull >= 2;
    }

    return {
        currentProperties,
        setCurrentProperties,
        cheapestSale, 
        setCheapestSale,
        hasTwoOrMoreValues
    }
}