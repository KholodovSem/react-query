import { useState, useEffect, useCallback } from 'react';
import axios, { AxiosError } from 'axios';

interface UseFetchDataReturnValue<T> {
  data: T[] | null;
  isLoading: boolean;
  error: string | null;
}

const useFetchData = <T extends {}>(
  url: string
): UseFetchDataReturnValue<T> => {
  const [data, setData] = useState<T[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    axios
      .get<T[]>(url)
      .then(response => setData(response.data))
      .catch((error: AxiosError) => setError(error.message))
      .finally(() => setIsLoading(false));
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    isLoading,
    error,
  };
};

export default useFetchData;
