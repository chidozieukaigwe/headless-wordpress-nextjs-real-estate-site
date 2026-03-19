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
    const { page } = queryString.parse(window.location.search);
    const response = await fetch(`/api/search`, {
      method: "POST",
      body: JSON.stringify({ page: parseInt(page) || 1 }),
    }).then((res) => res.json());
    const data = await response;
    console.log("Properties Data", data);
    setProperties(data.properties);
    setTotalResults(data.total);
  };

  const pageSize = 3;

  const handlePageClick = async (pageNumber) => {
    await router.push(
      `${router.query.slug.join("/")}?page=${pageNumber}`,
      null,
      {
        shallow: true,
      },
    );
  };

  useEffect(() => {
    search();
  }, []);

  return (
    <div>
      <Filters />
      <Results properties={properties} />
      <Pagination
        onPageClick={handlePageClick}
        totalPages={Math.ceil(totalResults / pageSize)}
      />
    </div>
  );
};
