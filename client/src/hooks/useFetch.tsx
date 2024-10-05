import { useState, useEffect } from "react";
import { FetchProp } from "../types";

const useFetch = ({ url }: FetchProp) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const result = await response.json();
        if (Array.isArray(result.data)) {
          setData(result.data);
        }
      } catch (error) {
        setError(true);
        setIsLoading(true);
        console.error(error);
      }
    };
    fetchData();
  }, [url]);

  return { data, error, isLoading };
};

export default useFetch;
