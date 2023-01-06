import useParallelQueries from '../hooks/useParallelQueries';
import { Hero } from '../models/Hero';
import { Friend } from '../models/Friend';

const ParalllelQueries = () => {
  const [superheroes, friends] = useParallelQueries<Hero[], Friend[]>(
    '/superheroes',
    '/friends'
  );

  const heroesMap = superheroes.data?.map(hero => (
    <div key={hero.id}>{hero.name}</div>
  ));
  const friendsMap = friends.data?.map(friend => (
    <div key={friend.id}>{friend.name}</div>
  ));

  const content = (
    <>
      <div>
        <h1>Heroes</h1>
        {heroesMap}
      </div>
      <div>
        <h1>Friends</h1>
        {friendsMap}
      </div>
    </>
  );

  return (
    <div>
      <h1>Parallel Queries</h1>
      {content}
    </div>
  );
};

export default ParalllelQueries;
