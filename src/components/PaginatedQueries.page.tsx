import { useState } from 'react';
import { useQuery } from 'react-query';
import { Color } from '../models/Color';
import { AxiosError } from 'axios';

const PaginatedQueriesPage = () => {
  const [page, setPage] = useState<number>(1);
  const { data, isLoading, isError, error } = useQuery<Color[], AxiosError>(
    `/colors?_limit=2&page=${page}`
  );

  const handleNextPage = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setPage(prevPage => {
      if (prevPage === 1) {
        return prevPage;
      }
      return prevPage - 1;
    });
  };

  let content;
  if (isLoading) {
    content = <div>Loading...</div>;
  } else if (isError) {
    content = <div>{error.message}</div>;
  } else {
    content = data?.map(color => (
      <div key={color.id}>
        <h2>{color.label}</h2>
      </div>
    ));
  }

  return (
    <>
      <div>{content}</div>
      <div className="flex gap-2">
        <button onClick={handleNextPage}>Next Page</button>
        <button onClick={handlePreviousPage}>Previous Page</button>
      </div>
    </>
  );
};

export default PaginatedQueriesPage;
