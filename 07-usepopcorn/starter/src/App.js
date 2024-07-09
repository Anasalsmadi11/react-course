import { useEffect, useRef, useState } from "react";
import StarRating from "./StarRating";
import { useMovies } from "./useMovies";
import { useLocalStorageState } from "./useLocalStorageState";
import { useKey } from "./useKey";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const KEY = "a056c112";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [ movies, isLoading, error ] = useMovies(query, handleCloseMovie);
  const [watched, setWatched] = useLocalStorageState([], "watched");

  // const [watched, setWatched] = useState(JSON.parse(localStorage.getItem('watched'))); // vid 163, it works fine however, we shouldnt do this cus we are calling function here so it would be called in every render and this is bad for performance

  /* 
  const [watched, setWatched] = useState(() => { //  this works perfectly but im using custom hooks(practicing)
    const storedValue = localStorage.getItem("watched");
    return JSON.parse(storedValue);
  }); // here im passing a func so this would only get excuted once in the comp initial render.
  
  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify(watched));
  }, [watched]);

*/
  /*
useEffect(()=>{
  console.log("After intial render")
},[])
useEffect(()=>{
  console.log("During each render")
})
useEffect(()=>{
  console.log(" after initial render and Only if query changes")
},[query])
console.log("C") // vid: 149 this will be print first cus useEffects works after the browser paint 
*/

  // fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=silent-voice`)
  //   .then((res) => res.json())
  //   .then((data) => setMovies(data.Search)); // it is wrong to set the state here, cus seting it will render the comp again causing the fetch to work again, it will create infinate loop with this, check the network in inspect youll see it re-renders forever.

  // setWatched([]) // seting the state here(regardless of the value) also will cause infinate loop

  // useEffect(()=>{
  //   fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=silent-voice`)
  //   .then((res) => res.json())
  //   .then((data) => setMovies(data.Search));

  // },[])

  function handleSelectMovie(id) {
    setSelectedId(id === selectedId ? null : id);
  }
  // const handleCloseMovie= ()=>{ // due to hoisting this wont work cus im calling the func above before initializing it, it only work if it was a regular func
  //   setSelectedId(null);
  // }
  function handleCloseMovie() {
    setSelectedId(null);
  }
  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]); // we use callback to update the existed value of state without losing it.
    localStorage.setItem("watched", JSON.stringify([...watched, movie])); // if i put watched it self it wont contain the last movie added since the state value wont be updated before render
    // handleCloseMovie();
  }
  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id)); // we use callbacks here to update an existing value of state
  }

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <Result movies={movies} />
      </NavBar>
      <Main>
        {/* <Box ele={<MovieList movies={movies} />} />
        <Box
          ele={
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList watched={watched} />
            </>
          }
        /> */}
        {/*===== or: ==== */}
        <Box>
          {/* {error? <ErrorMessage message={error}/>:isLoading? <Loader/>:<MovieList movies={movies} />} */}
          {isLoading && <Loader />}
          {error && <ErrorMessage message={error} />}
          {!isLoading && !error && (
            <MovieList handleSelectMovie={handleSelectMovie} movies={movies} />
          )}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              watched={watched}
              onAddWatched={handleAddWatched}
              handleCloseMovie={handleCloseMovie}
              selectedId={selectedId}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList
                onDeleteWatched={handleDeleteWatched}
                watched={watched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

function MovieDetails({ handleCloseMovie, selectedId, onAddWatched, watched }) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");
  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);

  const countRef = useRef(0);
  useEffect(
    function () {
      if (userRating) countRef.current++; // i put a condition cus in the initial mounting it incremnt the count
      console.log(countRef.current);
    },
    [userRating]
  );

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  ////////  vid: 161 ////////

  // /*eslint-disable */ // this comment disable eslint errors
  // if(imdbRating >7) [isTop,setIsTop] = useState(true) // with this hook created when the condition fulfilled, it will give an error in the console saying that the order of the hooks now changed

  ////////////

  // if(imdbRating >7) return <p>greate movie</p> // with this it will no longer see the hooks below becauase of the return, this line so the error: Rendered fewer hooks than expected

  ////////////

  // const [isTop, setIsTop] = useState(imdbRating > 8);
  // console.log(isTop); // it will always be flase cus in the initial rendering the imdbRating is undefined, and the initial state will only be looked at the mounting only, to solve this we put it inside useEffect

  // useEffect(() => {
  //   setIsTop(imdbRating >8)
  // }, [imdbRating]);
  //////////         istead we do a derive state:           ////////////

  // const isTop = imdbRating > 8;

  useEffect(() => {
    async function getMovieDetails() {
      setIsLoading(true);
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
      );
      const data = await res.json();

      setMovie(data);
      setIsLoading(false);
    }
    getMovieDetails();
  }, [selectedId]);

  useKey("Escape", handleCloseMovie);

  console.log("aaaaaaaa");
  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      userRating,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      counterRatingDecesion: countRef.current,
    };
    onAddWatched(newWatchedMovie);
  }

  // console.log(localStorage.getItem('watched'))
  // const watchedMovieRating= watched.map(movie=>movie.imdbID==selectedId?movie.userRating:"")
  const watchedMovieRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  useEffect(() => {
    //primary func(side effect func)
    if (!title) return;
    document.title = `Movie | ${title}`;
    console.log("rendered");
    return () => {
      // optional func(clean up func works only when unmount) the returned func is the clean up func inside the primary func
      // vid 155: clean up the side effect
      document.title = "Use Popcorn";
      console.log(`clean up the effect of the movie ${title}`);
    };
  }, [title]);

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button onClick={handleCloseMovie} className="btn-back">
              &larr;
            </button>
            <img src={poster} alt={`Poster of${title} movie`} />
            <div className="details-overview ">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>🌟</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />

                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to watched
                    </button>
                  )}
                </>
              ) : (
                <p>
                  you rated this movie {watchedMovieRating}
                  <span>🌟</span>
                </p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring{actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}
function Loader({ error }) {
  return <p className="loader">{error ? error : "Loading.."}.</p>;
}
function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>⛔</span>
      {message}
    </p>
  );
}
function NavBar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function Result({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

function Search({ query, setQuery }) {
  const inputEl = useRef(null);

  useKey("Enter", function () {
    if (document.activeElement === inputEl.current) return; // active ele is the element im focusing on right now without it when im writing a text in the search and hit enter it will delet the text
    inputEl.current.focus();
    setQuery("");
  });



  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}
/* 
function WatchedBox() {
  const [isOpen2, setIsOpen2] = useState(true);
  const [watched, setWatched] = useState(tempWatchedData);

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen2((open) => !open)}
      >
        {isOpen2 ? "–" : "+"}
      </button>
      {isOpen2 && (
        <>
          <WatchedSummary watched={watched} />
          <WatchedMovieList watched={watched} />
        </>
      )}
    </div>
  );
}
*/
function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchedMovieList({ onDeleteWatched, watched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie onDeleteWatched={onDeleteWatched} movie={movie} />
      ))}
    </ul>
  );
}

function WatchedMovie({ onDeleteWatched, movie }) {
  return (
    <li key={movie.imdbID}>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <button
          className="btn-delete"
          onClick={() => onDeleteWatched(movie.imdbID)}
        >
          X
        </button>
      </div>
    </li>
  );
}

function MovieList({ handleSelectMovie, movies }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie
          key={movie.imdbID}
          handleSelectMovie={handleSelectMovie}
          movie={movie}
        />
      ))}
    </ul>
  );
}

function Movie({ handleSelectMovie, movie }) {
  return (
    <li
      // role="click"
      onClick={() => handleSelectMovie(movie.imdbID)}
      key={movie.imdbID}
    >
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}
