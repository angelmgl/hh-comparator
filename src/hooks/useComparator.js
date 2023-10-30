import { useEffect, useState } from "react";
import { getTheCheapest, getTheMostBuilded, getTheMostLand, getTheMostOwned } from "../../comparators";

export default function useComparator(properties, filters) {
    const [currentProperties, setCurrentProperties] = useState({
        first: null,
        second: null,
        third: null,
        fourth: null,
    }); 
    const [hasTwoOrMoreValues, setHasTwoOrMoreValues] = useState(false);
    const [cheapest, setCheapest] = useState(null);
    const [mostBuilded, setMostBuilded] = useState(null);
    const [mostLand, setMostLand] = useState(null);
    const [mostOwned, setMostOwned] = useState(null);

    useEffect(() => {
        setCheapest(getTheCheapest(hasTwoOrMoreValues, properties, currentProperties, filters.operationType));
        setMostBuilded(getTheMostBuilded(hasTwoOrMoreValues, properties, currentProperties))
        setMostLand(getTheMostLand(hasTwoOrMoreValues, properties, currentProperties))
        setMostOwned(getTheMostOwned(hasTwoOrMoreValues, properties, currentProperties))
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
        mostBuilded,
        mostLand,
        mostOwned,
        hasTwoOrMoreValues
    }
}