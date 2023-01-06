import { useQuery, UseQueryResult } from 'react-query';
import { AxiosError } from 'axios';

const useParallelQueries = <T, U>(
  queryKeyOne: string,
  queryKeyTwo: string
): [UseQueryResult<T, AxiosError>, UseQueryResult<U, AxiosError>] => {
  const { ...first } = useQuery<T, AxiosError>({
    queryKey: queryKeyOne,
  });

  const { ...second } = useQuery<U, AxiosError>({
    queryKey: queryKeyTwo,
  });

  return [first, second];
};

export default useParallelQueries;
