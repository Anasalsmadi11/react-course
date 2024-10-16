import { useState, useEffect } from "react";


const KEY = "a056c112";

export function useMovies(query,callback) {
  //vid: 169 this is the custom hooks
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  useEffect(() => {

    /////// vid 145 ////////
    // callback?.()
    const controller = new AbortController()
    async function fetchMovies() {
      try {
        setError("");
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,{signal:controller.signal}
        ); // await cus fetch return a promise

        if (!res.ok)
          throw new Error("somthing went wrong while fetching movies."); // if an error throwen the compiler will ignore everything under this line in the try scoop.
        const data = await res.json(); // await cus res.json() return a promise

        if (data.Response === "False") throw new Error("movie not Found!");
        setMovies(data.Search);
        setIsLoading(false);
        setError("")
        // console.log(data.Search); // it console it twice cus of react strict mode (try remove it in the index.js file and see)
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    }
    if (query.length < 3) {
      setMovies([]);
      setError(""); // optional
      return; /// with this the fetchMovies wont be called
    }
    callback?.()
    fetchMovies();
    return ()=>{ // the clean up function get excuted when re-rendering and when unmounting.
      controller.abort();
    }
  }, [query]);
  return [ movies, isLoading, error ];
}
