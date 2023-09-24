import { useState, useEffect } from "react";
import { mapProperties } from "../helpers";

export default function useProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch("https://homehunters.idealscloud.uk/wp-json/comparador/v1/propiedades");
        const result = await response.json();
        setProperties(mapProperties(result));
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return { properties, loading, error };
}
