/* eslint-disable react-hooks/exhaustive-deps */
/**
 * Exercise 02: Movie Library
 * We are trying to make a movie library for internal users. We are facing some issues by creating this, try to help us following the next steps:
 * !IMPORTANT: Make sure to run yarn movie-api for this exercise
 * 1. We have an issue fetching the list of movies, check why and fix it (handleMovieFetch)
 * 2. Create a filter by fetching the list of gender (http://localhost:3001/genres) and then loading
 * list of movies that belong to that gender (Filter all movies).
 * 3. Order the movies by year and implement a button that switch between ascending and descending order for the list
 * 4. Try to recreate the user interface that comes with the exercise (exercise02.png)
 * 
 * You can modify all the code, this component isn't well designed intentionally. You can redesign it as you need.
 */

import "./assets/styles.css";
import { useEffect, useState } from "react";
import axios from "axios";
export default function Exercise02 () {
  const [movies, setMovies] = useState([])
  const [fetchCount, setFetchCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [genres,setGenres]=useState(["All"])
  const[genreValue,setGenreValue]=useState()
  const handleMovieFetch = () => {
    setLoading(true)
    setFetchCount(fetchCount + 1)
    console.log('Getting movies')
    fetch('http://localhost:3001/movies?_limit=50')
      .then(res => res.json())
      .then(json => {
        setMovies(json)
        setLoading(false)
      })
      .catch(() => {
        console.log('Run yarn movie-api for fake api')
      })
  }

  useEffect(() => {
    handleMovieFetch()
    
  }, [])
  useEffect(() => {
    axios
      .get('http://localhost:3001/genres')
      .then(res=>{
        setGenres(res.data)
      })
      .catch(err=>{
        console.log(err)
      })
  }, [])
 
  return (
    <section className="movie-library">
      <div className="fondo">
      <h1 className="movie-library__title">
        Movie Library
      </h1>
      <div className="movie-library__actions">
        <select  name="genre" placeholder="Search by genre..."
        onChange={e=>{
          const opcionSeleccionada = e.target.value
          setGenreValue(opcionSeleccionada)
        }}
        >
          <option value="all">All</option>
         {genres.map(e=>{
           return <option  value={e}>{e}</option>
         })}
        </select>
        <button className="ascend">desc</button>
        <button className="ascend">asce</button>

        </div>
      </div>
      {loading ? (
        <div className="movie-library__loading">
          <p>Loading...</p>
          <p>Fetched {fetchCount} times</p>
        </div>
      ) : (
        <ul className="moviesGrid">
          {movies.map(movie => (
            movie.genres[0] ===genreValue || movie.genres[1] ===genreValue || movie.genres[2] ===genreValue || "all"===genreValue?
            <li key={movie.id} className="movieCard" >
              <div >{movies.title}</div>
              <img 
              className="movieImage"
              width={400}
              height={350}
              src={movie.posterUrl} alt={movie.title} />
              
            </li>
            :null
          ))}
        </ul>
      )}
    </section>
  )
}