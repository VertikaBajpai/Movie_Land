
import './App.css';
import { useEffect, useState } from 'react';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';

//344b9da6
const API_URL='http://www.omdbapi.com?apikey=344b9da6'
const movie1={
  "Title": "Spiderman the Verse",
  "Year": "2019–",
  "imdbID": "tt12122034",
  "Type": "series",
  "Poster": "https://m.media-amazon.com/images/M/MV5BNDBjNWY3OWYtMjk2ZS00NjA2LWE0NzAtOWQxNzBhNjZlMGYyXkEyXkFqcGc@._V1_SX300.jpg"
}
function App() {

  const [movies,setMovies]=useState([]);

const [searchTerm,setSearchTerm]=useState('');
  const searchMovies=async(title)=>
  {
    const response=await fetch(`${API_URL}&s=${title}`)
const data=await response.json();
setMovies(data.Search);
  }
  useEffect(()=>
  {
searchMovies('Spiderman')
  },[]);
  return(
<div className='app'>
  <h1>MovieLand</h1>
  <div className='search'>
    <input
    placeholder='Search for movies'
    value={searchTerm}
    onChange={(e)=>{
      setSearchTerm(e.target.value)
    }}/>
  </div>
  <img src={SearchIcon}
  alt='search'
  onClick={()=>{
    searchMovies(searchTerm)
  }}/>
<div>
  {
    movies.length>0 ?
    (<div className='container'>
     
      {movies.map((movie)=>(
        <MovieCard movie={movie}/>
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

</div>

)
}
export default App;
