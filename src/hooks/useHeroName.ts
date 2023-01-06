import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import { Hero } from '../models/Hero';

interface SelectedHeroes {
  id: number;
  name: string;
}

const useHeroName = (queryKey: string) => {
  const { ...rest } = useQuery<Hero[], AxiosError, SelectedHeroes[]>({
    queryKey: queryKey,
    select: data => {
      return data.map(hero => {
        return {
          id: hero.id!,
          name: hero.name,
        };
      });
    },
  });

  return rest;
};

export default useHeroName;
