
import './App.css';
import { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import MovieInfo from './MovieInfo';

//344b9da6
const API_URL='http://www.omdbapi.com/?i=tt3896198&apikey=344b9da6'
const movie1={
  "Title": "Spiderman the Verse",
  "Year": "2019–",
  "imdbID": "tt12122034",
  "Type": "series",
  "Poster": "https://m.media-amazon.com/images/M/MV5BNDBjNWY3OWYtMjk2ZS00NjA2LWE0NzAtOWQxNzBhNjZlMGYyXkFqcGc@._V1_SX300.jpg"
}
function App() {

  const [movies,setMovies]=useState([]);
  const [searchTerm,setSearchTerm]=useState('');
  const [selectedMovie,setSelectedMovie]=useState(null);

  const searchMovies=async(title)=>
  {
    const response=await fetch(`${API_URL}&s=${title}`)
    const data=await response.json();
    setMovies(data.Search || []);
    setSelectedMovie(null);
  }

  useEffect(()=>
  {
    searchMovies('Spiderman')
  },[]);

  return(
<div className='app'>
  {selectedMovie && (
    <button className='back-button' onClick={()=>setSelectedMovie(null)}>
      ←
    </button>
  )}
  <h1 className={selectedMovie ? 'movie-info-title' : ''}>
    {selectedMovie ? selectedMovie.Title : 'MovieLand'}
  </h1>

  {selectedMovie ? (
    <MovieInfo
      movie={selectedMovie}
      onBack={()=>setSelectedMovie(null)}
    />
  ) : (
<div>
  <div className='search'>
    <input
    placeholder='Search for movies'
    value={searchTerm}
    onChange={(e)=>{
      setSearchTerm(e.target.value)
    }}/>
    <button
      className='search-button'
      onClick={()=>searchMovies(searchTerm)}
    >
      Search
    </button>
  </div>
  {
    movies.length>0 ?
    (<div className='container'>
     
      {movies.map((movie)=>(
        <MovieCard
          key={movie.imdbID}
          movie={movie}
          onClick={()=>setSelectedMovie(movie)}
        />
      ))}
      </div>
    

    ):
    (
      <div className='empty'>
        <h2>No movies found</h2>
</div>
    )
  }
</div>
  )}

</div>

)
}
export default App;
