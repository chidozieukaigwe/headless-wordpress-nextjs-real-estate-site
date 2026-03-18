import { useEffect, useState } from "react";
import { Results } from "./Results";

export const PropertySearch = () => {
  const [properties, setProperties] = useState([]);
  useEffect(() => {
    const search = async () => {
      const response = await fetch("/api/search").then((res) => res.json());
      const data = await response;
      console.log("Properties Data", data.properties.nodes);
      setProperties(data.properties.nodes);
    };
    search();
  }, []);
  return <Results properties={properties} />;
};
