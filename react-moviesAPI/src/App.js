import { useState, useEffect } from 'react';

function App() {
  const [popular, setPopular] = useState();

  const movieAPI =
    'https://api.themoviedb.org/3/movie/popular?api_key=63c32ceaab559b4028fce262696a11ed&language=en-US&page=1';

  const fetchmovies = async () => {
    const res = await fetch(movieAPI);
    const data = await res.json();
    const movies = data.results.map((movie) => (
      <div key={movie.id}>
        <h2>{movie.title}</h2>
        <img
          src={'https://image.tmdb.org/t/p/w500' + movie.backdrop_path}
          alt=''
        />
      </div>
    ));

    setPopular(movies);
  };

  useEffect(fetchmovies);

  return (
    <div>
      <div className='filter-container'>
        <button>All</button>
        <button>Comedy</button>
        <button>Action</button>
      </div>
      <div className='popular-movies'>{popular}</div>
    </div>
  );
}

export default App;
