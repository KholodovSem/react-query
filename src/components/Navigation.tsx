import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <div>
      <nav className="mb-[50px]">
        <ul className="flex gap-2 items-center">
          <li className="p-2">Links:</li>
          <li className="border border-black p-2">
            <Link to={'/'}>Home</Link>
          </li>
          <li className="border border-black p-2">
            <Link to={'/super-heroes'}>Super Heroes Page</Link>
          </li>
          <li className="border border-black p-2">
            <Link to={'/rq-super-heroes'}>RQ Super Heroes Page</Link>
          </li>
          <li className="border border-black p-2">
            <Link to={'/parallel'}>Parallel</Link>
          </li>
          <li className="border border-black p-2">
            <Link to={'/dependent'}>Dependent</Link>
          </li>
          <li className="border border-black p-2">
            <Link to={'/pagination'}>Pagination</Link>
          </li>
          <li className="border border-black p-2">
            <Link to={'/infinite'}>Infinite Scroll</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
