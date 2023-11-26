import { useState, useEffect } from "react";

const useFetchData = (fetchFunction) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [shouldRefetch, setShouldRefetch] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetchFunction();
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [fetchFunction, shouldRefetch]);

  const refetch = () => {
    setShouldRefetch((prev) => !prev);
  };

  return { data, isLoading, error, refetch };
};

export default useFetchData;
