import { useQuery, useQueryClient } from 'react-query';
import { Hero } from '../models/Hero';

const useHeroById = (heroId: number | string) => {
  const queryClient = useQueryClient();
  const heroes = queryClient.getQueryData<Hero[]>('/superheroes');
  let hero: Hero | undefined;
  if (heroes) {
    hero = heroes.find(hero => hero.id === heroId);
  } else {
    hero = undefined;
  }
  const { ...rest } = useQuery<Hero>({
    queryKey: `/superheroes/${heroId}`,
    initialData: hero,
  });

  return rest;
};

export default useHeroById;
