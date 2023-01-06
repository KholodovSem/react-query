import { QueryClient, QueryOptions } from 'react-query';
import axios from 'axios';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: fetchData,
    },
  },
});

async function fetchData<T>({ queryKey }: QueryOptions) {
  const { data } = await axios.get<T[]>(`http://localhost:4000${queryKey}`);
  return data;
}
