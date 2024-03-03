import React from 'react';
import { useParams } from 'react-router-dom';
import { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import useSWR from 'swr';
import { fetcher, tmdbAPI } from '../../config.js';
import MovieCard from '../movie/MovieCard';

const MovieDetailsPage = () => {
  const { movieID } = useParams();
  const { data } = useSWR(tmdbAPI.getMovieDetails(movieID), fetcher);
  if (!data) return null;
  const { backdrop_path, poster_path, genres, title, overview } = data;
  return (
    <div className="p-10">
      <div className="relative h-[600px] w-full ">
        <div className="absolute inset-0 bg-black overlay bg-opacity-70"></div>
        <div
          style={{
            backgroundImage: `url(${tmdbAPI.imageOriginal(backdrop_path)})`,
          }}
          className="w-full h-full bg-no-repeat bg-cover rounded-lg shadow-lg"
        ></div>
      </div>
      <div className="relative w-full h-[400px] max-w-[800px] mx-auto -mt-[200px] pb-10 z-10">
        <img
          className="object-cover w-full h-full rounded-lg"
          src={tmdbAPI.imageOriginal(poster_path)}
          alt=""
        />
      </div>
      <h1 className="mb-5 text-4xl font-bold text-center text-white">
        {title}
      </h1>
      {genres.length > 0 && (
        <div className="flex items-center justify-center mb-10 text-white gap-x-5">
          {genres.map((item) => {
            return (
              <span
                className="px-4 py-2 bg-transparent border-2 rounded-lg shadow-md cursor-pointer border-borderColor"
                key={item.id}
              >
                {item.name}
              </span>
            );
          })}
        </div>
      )}
      <p className="leading-relaxed text-center max-w-[400px] mx-auto mb-10 text-descColor">
        {overview}
      </p>
      <MovieMeta type="credits" />
      <MovieMeta type="videos" />
      <MovieMeta type="similar" />
    </div>
  );
};

function MovieMeta({ type }) {
  const { movieID } = useParams();
  const { data } = useSWR(tmdbAPI.getMovieMeta(movieID, type), fetcher);
  if (!data) return null;
  if (type === 'credits') {
    const { cast } = data;
    if (!cast || !cast.length <= 0) return null;
    return (
      <>
        <h2 className="mb-10 text-3xl text-center text-white">Cast</h2>
        <div className="grid grid-cols-4 gap-5">
          {cast.slice(0, 4).map((item) => (
            <div
              className="flex flex-col items-center justify-center gap-y-5"
              key={item.id}
            >
              <img
                className="object-cover w-full h-full rounded-lg shadow-md"
                src={tmdbAPI.imageOriginal(item.profile_path)}
                alt={item.name}
              />
              <h3 className="text-xl font-bold tracking-normal text-white">
                {item.name}
              </h3>
            </div>
          ))}
        </div>
      </>
    );
  } else {
    const { results } = data;
    if (!results || results.length <= 0) return null;
    if (type === 'videos') {
      return (
        <div className="p-10">
          <h1 className="my-5 text-3xl text-center text-white capitalize">
            trailer
          </h1>
          <div className="flex flex-col gap-5">
            {results.slice(0, 2).map((item) => (
              <div key={item.id}>
                <h3 className="inline-block p-3 my-5 rounded-lg shadow-lg bg-primary text-descColor">
                  {item.name}
                </h3>
                <div className="w-full aspect-video">
                  <iframe
                    className="object-fill w-full h-full"
                    width="656"
                    height="369"
                    src={`https://www.youtube.com/embed/${item.key}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    if (type === 'similar')
      return (
        <>
          <h1 className="text-3xl text-center text-[#56C596] my-10">
            Movie similar
          </h1>
          <div className="movie-list">
            <Swiper
              modules={[Autoplay]}
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
              }}
              spaceBetween={40}
              slidesPerView={'4'}
              grabCursor={true}
            >
              {results.length > 0 &&
                results.map((item) => (
                  <SwiperSlide key={item.id}>
                    <MovieCard item={item}></MovieCard>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </>
      );
  }
  return null;
}

export default MovieDetailsPage;
