import { useEffect } from "react";

export const PropertySearch = () => {
  useEffect(() => {
    const search = async () => {
      const response = await fetch("/api/search").then((res) => res.json());
      const data = await response;
      console.log("DATA", data);
    };
    search();
  }, []);
  return <div>Property Search</div>;
};
