import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useHeroName from '../hooks/useHeroName';
import useAddSuperHero from '../hooks/useAddSuperHero';

type InputName = 'name' | 'alterEgo';

const RQSuperHeroesPage = () => {
  const [name, setName] = useState<string>('');
  const [alterEgo, setAlterEgo] = useState<string>('');

  const { data, isError, isLoading, error } = useHeroName('/superheroes');
  const { mutate: addHero } = useAddSuperHero();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name as InputName;
    const value = e.target.value;

    switch (name) {
      case 'name': {
        setName(value);
        break;
      }

      case 'alterEgo': {
        setAlterEgo(value);
        break;
      }
    }
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    addHero({ name, alterEgo });
  };

  let content;
  if (isLoading) {
    content = <h2>Loading...</h2>;
  } else if (isError) {
    content = <h2>{error.message}</h2>;
  } else {
    content = data?.map(hero => (
      <div key={hero.id}>
        <Link to={hero.id.toString()}>{hero.name} </Link>
      </div>
    ));
  }

  return (
    <div>
      <h1>RQ Super Heroes Page</h1>
      <form onSubmit={handleSubmit}>
        <input name="name" value={name} onChange={handleChange} />
        <input name="alterEgo" value={alterEgo} onChange={handleChange} />
        <button>Add New Hero</button>
      </form>
      {content}
    </div>
  );
};

export default RQSuperHeroesPage;
