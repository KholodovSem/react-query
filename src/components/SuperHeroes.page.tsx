import React from 'react';
import useFetchData from '../hooks/useFetchData';
import { Hero } from '../models/Hero';

const SuperHeroesPage = () => {
  const { data, isLoading, error } = useFetchData<Hero>(
    'http://localhost:4000/superheroes'
  );

  let content;
  if (isLoading) {
    content = <h2>Loading...</h2>;
  } else if (error) {
    content = <h2>{error}</h2>;
  } else {
    content = data?.map(hero => <div key={hero.id}>{hero.name}</div>);
  }

  return (
    <div>
      <h2>Super Heroes Page</h2>
      {content}
    </div>
  );
};

export default SuperHeroesPage;
