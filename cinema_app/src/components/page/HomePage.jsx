import React from "react";
import MovieList from "../movie/MovieList";

const HomePage = () => {
  return (
    <>
      <section className="pb-20 page-contaier">
        <h2 className="mb-10 text-3xl font-bold text-white capitalize">
          now playing
        </h2>
        <MovieList type="now_playing" />
      </section>
      <section className="pb-20 page-contaier">
        <h2 className="mb-10 text-3xl font-bold text-white capitalize">
          top rated movies
        </h2>
        <MovieList type="top_rated" />
      </section>
      <section className="pb-20 page-contaier">
        <h2 className="mb-10 text-3xl font-bold text-white capitalize">
          trending
        </h2>
        <MovieList type="popular" />
      </section>
    </>
  );
};

export default HomePage;
