import { useEffect, useState } from "react";
import { 
    getTheCheapest,
    getTheMostBuilded, 
    getTheMostLand, 
    getTheMostOwned, 
    getTheMostValuableRentPerM2Build, 
    getTheMostValuableRentPerM2Own, 
    getTheMostValuableRentPerM2Land, 
    getTheMostValuableSalePerM2Build,
    getTheMostValuableSalePerM2Own,
    getTheMostValuableSalePerM2Land,
} from "../../comparators";

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
    const [mostValuableSalePerM2Own, setMostValuableSalePerM2Own] = useState(null);
    const [mostValuableRentPerM2Own, setMostValuableRentPerM2Own] = useState(null);
    const [mostValuableSalePerM2Build, setMostValuableSalePerM2Build] = useState(null);
    const [mostValuableRentPerM2Build, setMostValuableRentPerM2Build] = useState(null);
    const [mostValuableSalePerM2Land, setMostValuableSalePerM2Land] = useState(null);
    const [mostValuableRentPerM2Land, setMostValuableRentPerM2Land] = useState(null);


    useEffect(() => {
        setCheapest(getTheCheapest(hasTwoOrMoreValues, properties, currentProperties, filters.operationType));
        setMostBuilded(getTheMostBuilded(hasTwoOrMoreValues, properties, currentProperties))
        setMostLand(getTheMostLand(hasTwoOrMoreValues, properties, currentProperties))
        setMostOwned(getTheMostOwned(hasTwoOrMoreValues, properties, currentProperties))
        setMostValuableSalePerM2Own(getTheMostValuableSalePerM2Own(hasTwoOrMoreValues, properties, currentProperties));
        setMostValuableSalePerM2Build(getTheMostValuableSalePerM2Build(hasTwoOrMoreValues, properties, currentProperties));
        setMostValuableSalePerM2Land(getTheMostValuableSalePerM2Land(hasTwoOrMoreValues, properties, currentProperties));
        setMostValuableRentPerM2Own(getTheMostValuableRentPerM2Own(hasTwoOrMoreValues, properties, currentProperties));
        setMostValuableRentPerM2Build(getTheMostValuableRentPerM2Build(hasTwoOrMoreValues, properties, currentProperties));
        setMostValuableRentPerM2Land(getTheMostValuableRentPerM2Land(hasTwoOrMoreValues, properties, currentProperties));
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
        mostValuableSalePerM2Own,
        mostValuableRentPerM2Own,
        mostValuableSalePerM2Build,
        mostValuableRentPerM2Build,
        mostValuableSalePerM2Land,
        mostValuableRentPerM2Land,
        hasTwoOrMoreValues
    }
}