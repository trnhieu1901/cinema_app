import React from 'react';
import { tmdbAPI } from '../../config.js';
import Button from '../button/Button';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({
  item: { original_title, vote_average, id, poster_path, release_date },
}) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col h-full p-3 text-white rounded-lg select-none movie-card bg-slate-800">
      <img
        className="object-cover w-full rounded-lg h-[250px] mb-5 "
        src={`${tmdbAPI.imageOriginal(poster_path)}`}
        alt={original_title}
      />
      <div className="flex flex-col flex-1">
        <h3 className="mb-3 text-xl font-bold capitalize">{original_title}</h3>
        <div className="flex items-center justify-between mb-5 opacity-50">
          <span>{new Date(release_date).getFullYear()}</span>
          <span>{vote_average}</span>
        </div>
        <Button onClick={() => navigate(`/movies/${id}`)} bgColor="secondary">
          watch now
        </Button>
      </div>
    </div>
  );
};

export default MovieCard;
