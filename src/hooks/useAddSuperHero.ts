import axios, { AxiosError } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { Hero } from '../models/Hero';

const addSuperHero = async (hero: Hero) => {
  const { data } = await axios.post<Hero>(
    'http://localhost:4000/superheroes',
    hero
  );
  return data;
};

const useAddSuperHero = () => {
  const queryClient = useQueryClient();
  const { ...rest } = useMutation<Hero, AxiosError, Hero>(addSuperHero, {
    onSuccess: data => {
      // queryClient.invalidateQueries('/superheroes'); //! OR
      console.log(data);
      queryClient.setQueriesData<Hero[]>('/superheroes', oldQueryData => {
        if (oldQueryData) {
          return [...oldQueryData, data];
        }
        return [data];
      });
    },
  });

  return rest;
};

export default useAddSuperHero;
