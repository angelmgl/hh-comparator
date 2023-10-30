export function getTheCheapestSale(condition, properties, currentProperties) {
    return condition
        ? getTheMost(properties, currentProperties, "salePriceUSD", false)
        : null;
}

export function getTheCheapestRent(condition, properties, currentProperties) {
    return condition
        ? getTheMost(properties, currentProperties, "rentPriceUSD", false)
        : null;
}

export function getTheMostBuilded(condition, properties, currentProperties) {
    return condition
        ? getTheMost(properties, currentProperties, "m2Build", true)
        : null;
}

export function getTheMostOwned(condition, properties, currentProperties) {
    return condition
        ? getTheMost(properties, currentProperties, "m2Own", true)
        : null;
}

export function getTheMostLand(condition, properties, currentProperties) {
    return condition
        ? getTheMost(properties, currentProperties, "m2Land", true)
        : null;
}

export function getTheMostValuableSalePerM2Own(
    condition,
    properties,
    currentProperties
) {
    return condition
        ? getTheMost(properties, currentProperties, "m2OwnSaleValue", false)
        : null;
}

export function getTheMostValuableSalePerM2Build(
    condition,
    properties,
    currentProperties
) {
    return condition
        ? getTheMost(properties, currentProperties, "m2BuildSaleValue", false)
        : null;
}

export function getTheMostValuableSalePerM2Land(
    condition,
    properties,
    currentProperties
) {
    return condition
        ? getTheMost(properties, currentProperties, "m2LandSaleValue", false)
        : null;
}

export function getTheMostValuableRentPerM2Own(
    condition,
    properties,
    currentProperties
) {
    return condition
        ? getTheMost(properties, currentProperties, "m2OwnRentValue", false)
        : null;
}

export function getTheMostValuableRentPerM2Build(
    condition,
    properties,
    currentProperties
) {
    return condition
        ? getTheMost(properties, currentProperties, "m2BuildRentValue", false)
        : null;
}

export function getTheMostValuableRentPerM2Land(
    condition,
    properties,
    currentProperties
) {
    return condition
        ? getTheMost(properties, currentProperties, "m2LandRentValue", false)
        : null;
}

function getTheMost(properties, currentProperties, field, highest) {
    const fullProperties = ["first", "second", "third", "fourth"].map((key) =>
        properties.find((property) => property.code === currentProperties[key])
    );

    const validProperties = fullProperties.filter(
        (property) => property && property[field] != null
    );

    if (validProperties.length === 0) return null;

    const mostProperty = validProperties.reduce((prev, currentProperty) => {
        if (highest) {
            return currentProperty[field] > prev[field]
                ? currentProperty
                : prev;
        } else {
            return currentProperty[field] < prev[field]
                ? currentProperty
                : prev;
        }
    }, validProperties[0]);

    return mostProperty ? mostProperty.code : null;
}
