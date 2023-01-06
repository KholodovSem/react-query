import { useInfiniteQuery } from 'react-query';
import { Color } from '../models/Color';
import axios, { AxiosError } from 'axios';

const fetchColors = async ({ pageParam = 1 }) => {
  const { data } = await axios.get<Color[]>(
    `http://localhost:4000/colors?_limit=2&_page=${pageParam}`
  );
  return data;
};

export const InfiniteQueriesPage = () => {
  const { data, isLoading, isError, error, fetchNextPage, hasNextPage } =
    useInfiniteQuery<Color[], AxiosError>('colors', fetchColors, {
      getNextPageParam: (lastPage, allPages) => {
        const MAX_PAGE = 3;
        if (allPages.length < MAX_PAGE) {
          return allPages.length + 1;
        } else {
          return undefined;
        }
      },
    });

  console.log(hasNextPage);

  const handleNextPage = () => {
    fetchNextPage();
  };

  let content;
  if (isLoading) {
    content = <div>Loading...</div>;
  } else if (isError) {
    content = <div>{error.message}</div>;
  } else {
    content = data?.pages.map(page => {
      return page.map(color => {
        return (
          <div key={color.id}>
            <h2>{color.label}</h2>
          </div>
        );
      });
    });
  }

  return (
    <div>
      {content}
      <div>
        <button
          onClick={handleNextPage}
          className="cursor-pointer"
          disabled={!hasNextPage}
        >
          Load More
        </button>
      </div>
    </div>
  );
};
