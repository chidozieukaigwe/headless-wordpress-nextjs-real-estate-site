import { useEffect, useState } from "react";
import { Results } from "./Results";
import { Pagination } from "./Pagination /Pagination";
import { useRouter } from "next/router";
import queryString from "query-string";
import { Filters } from "./Filters";

export const PropertySearch = () => {
  const [properties, setProperties] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const router = useRouter();

  const search = async () => {
    const { page, petFriendly, hasParking, minPrice, maxPrice } =
      queryString.parse(window.location.search);
    const filters = {};
    if (minPrice) filters.minPrice = minPrice;
    if (maxPrice) filters.maxPrice = maxPrice;
    if (petFriendly === "true") filters.petFriendly = true;
    if (hasParking === "true") filters.hasParking = true;

    const response = await fetch(`/api/search`, {
      method: "POST",
      body: JSON.stringify({ page: parseInt(page) || 1, ...filters }),
    }).then((res) => res.json());

    const data = await response;
    console.log("Properties Data", data);
    setProperties(data.properties);
    setTotalResults(data.total);
  };

  const pageSize = 3;

  const handlePageClick = async (pageNumber) => {
    const { petFriendly, hasParking, minPrice, maxPrice } = queryString.parse(
      window.location.search,
    );
    await router.push(
      `${router.query.slug.join("/")}?page=${pageNumber}&petFriendly=${petFriendly === "true"}&hasParking=${!!hasParking}&minPrice=${minPrice}&maxPrice=${maxPrice}`,
      null,
      {
        shallow: true,
      },
    );
    search();
  };

  const handleSearch = async ({
    petFriendly,
    hasParking,
    minPrice,
    maxPrice,
  }) => {
    // update our browser url
    // search
    console.log("FILTERS", { petFriendly, hasParking, minPrice, maxPrice });
    await router.push(
      `${router.query.slug.join("/")}?page=1&petFriendly=${!!petFriendly}&hasParking=${!!hasParking}&minPrice=${minPrice}&maxPrice=${maxPrice}`,
      null,
      {
        shallow: true,
      },
    );
    search();
  };

  useEffect(() => {
    search();
  }, []);

  return (
    <div>
      <Filters onSearch={handleSearch} />
      <Results properties={properties} />
      <Pagination
        onPageClick={handlePageClick}
        totalPages={Math.ceil(totalResults / pageSize)}
      />
    </div>
  );
};
