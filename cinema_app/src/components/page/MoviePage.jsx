import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { fetcher, tmdbAPI } from '../../config';
import MovieCard from '../movie/MovieCard';
import { AiOutlineSearch } from 'react-icons/ai';
import MoviePageLoading from '../movie/MoviePageLoading';
import ReactPaginate from 'react-paginate';
import Button from '../button/Button';

const itemsPerPage = 20;
const MoviePage = () => {
  const [query, setQuery] = useState('');
  const [nextPage, setNextPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [itemOffset, setItemOffset] = useState(1);
  const [url, setUrl] = useState(tmdbAPI.getMovieSearch(query, nextPage));

  const { data, error } = useSWR(url, fetcher);

  const loading = !data && !error;

  function handleSearchMovie(e) {
    setQuery(e.target.value);
  }
  function handleClickMovie() {
    setUrl(tmdbAPI.getMovieSearch(query, nextPage));
  }

  useEffect(() => {
    if (!query) return setUrl(tmdbAPI.getMovieList('popular', nextPage));
  }, [query, nextPage]);

  const movies = data?.results || [];

  useEffect(() => {
    if (!data || !data.total_results) return;
    setPageCount(Math.ceil(data.total_results / itemsPerPage));
  }, [itemOffset, data]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.total_results;
    setItemOffset(newOffset);
    setNextPage(event.selected + 1);
  };

  return (
    <div className="p-5">
      <div className="flex items-center justify-center gap-3 mb-10">
        <input
          onChange={handleSearchMovie}
          value={query}
          className="w-full p-3 bg-transparent rounded-lg shadow-lg outline-none border border-[#C2C8C5] text-white"
          placeholder="Movie serach....."
          type="text"
        />
        <button
          onClick={handleClickMovie}
          className="px-6 py-4 text-white rounded-lg shadow-md bg-primary"
        >
          <AiOutlineSearch className="w-5 h-5" />
        </button>
      </div>
      {loading && (
        <div className="grid grid-cols-4 gap-5">
          <MoviePageLoading />
          <MoviePageLoading />
          <MoviePageLoading />
          <MoviePageLoading />
          <MoviePageLoading />
          <MoviePageLoading />
          <MoviePageLoading />
          <MoviePageLoading />
        </div>
      )}
      <div className="grid grid-cols-4 gap-5">
        {!loading &&
          movies?.length > 0 &&
          movies?.map((item) => <MovieCard key={item.id} item={item} />)}
      </div>
      <div className="flex items-center justify-center gap-5 my-5 text-white">
        <ReactPaginate
          breakLabel="..."
          nextLabel=" >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< "
          renderOnZeroPageCount={null}
          className="pagination"
        />
        <Button bgColor="secondary">Load more</Button>
      </div>
    </div>
  );
};

export default MoviePage;
