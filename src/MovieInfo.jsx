import React, { useEffect, useState } from "react";

const API_KEY = process.env.REACT_APP_API_KEY;

function MovieInfo({ movie, onBack }) {
  const [details, setDetails] = useState(movie);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!movie || !movie.imdbID) return;

    const fetchDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}?apikey=${API_KEY}&i=${movie.imdbID}&plot=full`
        );
        const data = await response.json();
        if (data && data.Response !== "False") {
          setDetails(data);
        }
      } catch (error) {
        // optional: handle error
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [movie]);

  if (!movie) return null;

  return (
    <div className="movie-info-container">
      {/* Single row: 3 columns - poster, year/type, description */}
      <div className="movie-info-row">
        <div className="movie-info-poster-wrapper">
          <img
            className="movie-info-poster"
            src={details?.Poster}
            alt={details?.Title}
          />
        </div>

        <div className="movie-info-content">
          <div className="movie-info-meta">
            <p>Year: {details?.Year}</p>
            <p>Type: {details?.Type}</p>
          </div>

          <div className="movie-info-desc">
            {loading ? (
              <p>Loading details...</p>
            ) : (
              <p>{details?.Plot || "No description available."}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieInfo;

