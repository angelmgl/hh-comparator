export function getTheCheapest(
    condition,
    properties,
    currentProperties,
    operationType
) {
    if (condition) {
        const firstProperty = properties.filter(
            (property) => property.code == currentProperties.first
        )[0];
        const secondProperty = properties.filter(
            (property) => property.code == currentProperties.second
        )[0];
        const thirdProperty = properties.filter(
            (property) => property.code == currentProperties.third
        )[0];
        const fourthProperty = properties.filter(
            (property) => property.code == currentProperties.fourth
        )[0];

        const fullProperties = [
            firstProperty,
            secondProperty,
            thirdProperty,
            fourthProperty,
        ];

        const validProperties = fullProperties.filter(
            (property) => property !== null && property !== undefined
        );

        let xcheapest;

        if(operationType === "Venta" && validProperties.length > 0) {
            xcheapest = validProperties?.reduce((cheapest, currentProperty) => {
                return currentProperty.salePriceUSD < cheapest.salePriceUSD
                    ? currentProperty
                    : cheapest;
            }, validProperties[0]);
        } else if(operationType === "Alquiler" && validProperties.length > 0) {
            xcheapest = validProperties?.reduce((cheapest, currentProperty) => {
                return currentProperty.rentPriceUSD < cheapest.rentPriceUSD
                    ? currentProperty
                    : cheapest;
            }, validProperties[0]);
        }

        return xcheapest ? xcheapest.code : null;
    } else {
        return null;
    }
}