import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import useSWR from 'swr';
import { fetcher, tmdbAPI } from '../../config';
import Button from '../button/Button';
const Banner = () => {
  const { data } = useSWR(tmdbAPI.getMovieList('upcoming'), fetcher);
  const movies = data?.results;
  return (
    <section className="h-[500px] w-full page-container  mb-10 banner overflow-hidden">
      <Swiper
        autoplay={{
          delay: 2000,
        }}
        modules={[Autoplay]}
        grabCursor={true}
      >
        {movies?.length > 0 &&
          movies?.map((item) => (
            <SwiperSlide key={item.id}>
              <BannerItem item={item}></BannerItem>
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
};

const BannerItem = ({ item: { title, poster_path, id } }) => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-full rounded-lg">
      <img
        className="object-cover w-full h-full"
        src={tmdbAPI.imageOriginal(poster_path)}
        alt=""
      />
      <div className="absolute w-full left-5 bottom-5">
        <h2 className="mb-5 text-3xl font-bold text-white">{title}</h2>
        <div className="flex items-center mb-5 text-white cursor-pointer gap-x-5">
          <span className="border-2 border-[#F8D90F] p-3 rounded-lg">
            Action
          </span>
          <span className="border-2 border-[#F8D90F] p-3 rounded-lg">
            adventure
          </span>
          <span className="border-2 border-[#F8D90F] p-3 rounded-lg">
            Drama
          </span>
        </div>
        <Button
          onClick={() => navigate(`/movies/${id}`)}
          bgColor="secondary"
          id={id}
        >
          watch now
        </Button>
      </div>
    </div>
  );
};

export default Banner;
