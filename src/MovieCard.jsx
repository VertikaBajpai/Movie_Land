import React from "react";

function MovieCard({ movie, onClick }) {
  return (
    <div className='movie' onClick={onClick}>
      <div>
        <p>{movie.Year}</p>
      </div>
      <div>
        <img src={movie.Poster} alt={movie.Title} />
      </div>
      <div>
        <span>{movie.Type}</span>
        <h3>{movie.Title}</h3>
      </div>
    </div>
  );
}

export default MovieCard;