import React from 'react';
import { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import useSWR from 'swr';
import { fetcher, tmdbAPI } from '../../config';
import MovieCard from './MovieCard';

const MovieList = ({ type }) => {
  const { data } = useSWR(tmdbAPI.getMovieList(type), fetcher);
  if (!data && !data?.results) return null;
  const movies = data?.results;
  return (
    <div className="movie-list">
      <Swiper
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        spaceBetween={40}
        grabCursor={true}
        slidesPerView={4}
      >
        {movies.length > 0 &&
          movies.map((item) => (
            <SwiperSlide key={item.id}>
              <MovieCard item={item}></MovieCard>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default MovieList;
