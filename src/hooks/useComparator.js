import { useEffect, useState } from "react";
import { getTheCheapest } from "../../comparators";

export default function useComparator(properties, filters) {
    const [currentProperties, setCurrentProperties] = useState({
        first: null,
        second: null,
        third: null,
        fourth: null,
    }); 
    const [hasTwoOrMoreValues, setHasTwoOrMoreValues] = useState(false);
    const [cheapest, setCheapest] = useState(null);

    useEffect(() => {
        setCheapest(getTheCheapest(hasTwoOrMoreValues, properties, currentProperties, filters.operationType));
    }, [currentProperties, hasTwoOrMoreValues, properties, filters])

    useEffect(() => {
        const values = Object.values(currentProperties);
        const countNonNull = values.filter(value => value !== null).length;

        setHasTwoOrMoreValues(countNonNull >= 2);
    }, [currentProperties])

    return {
        currentProperties,
        setCurrentProperties,
        cheapest,
        hasTwoOrMoreValues
    }
}