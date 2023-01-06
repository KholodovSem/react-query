import { useParams } from 'react-router-dom';
import useHeroById from '../hooks/useHeroById';

const RQSuperHeroPage = () => {
  const { heroId } = useParams();
  const { data } = useHeroById(heroId!);

  return (
    <div>
      <h1>Super Hero Details</h1>
      <div>
        <p>Name: {data?.name}</p>
        <p>AlterEgo: {data?.alterEgo}</p>
      </div>
    </div>
  );
};

export default RQSuperHeroPage;
