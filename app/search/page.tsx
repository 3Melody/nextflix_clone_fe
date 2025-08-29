'use client';

import React, { useState , useEffect } from 'react'
import Thumbnail from '../../components/thumbnail_component';
import { useParams } from 'next/navigation';
import MovieDetailModal from '../../components/popup_movie_detail';


export default function serachPage() {

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [movieTotal , setMovieTotal] = useState(0);
  const [movies , setMovies] = useState([]);
  const [keyword , setKeyword] = useState('');
  const [movieId, setMovieId] = useState(Number(0));
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const handleStorageChange = () => {
    const lastSearch = localStorage.getItem('lastSearch') || '';
    setKeyword(lastSearch);
    fetchMovies(lastSearch);
  };

  window.addEventListener('lastSearchChange', handleStorageChange);

  return () => window.removeEventListener('lastSearchChange', handleStorageChange);
  
  }, [keyword]);

  const showModalDetails = (movieId: number) => {
  setMovieId(movieId);
  setOpenModal(true);
};

  const fetchMovies = async (query : string) => {
    try {
      if(!query){
        setMovies([]);
        setMovieTotal(0);
        return null;
      };
      const response = await fetch(`${apiUrl}/movies/search/${query}`);
      const data = await response.json();
      setMovies(data);
      setMovieTotal(data.length);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };
  



  return (
    <div>
      <div className="pt-20 px-13 ">
        <div className="text-xl font-bold">Search Result : {movieTotal}</div>
        <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-6 gap-3 mt-5">
          {movies.map((movie: any) => (
            <div key={movie.id} onClick={() => showModalDetails(movie.id)}>
              {" "}
              <Thumbnail image={movie.posterUrl} title={movie.title} />
            </div>
          ))}
        </div>
      </div>
      <MovieDetailModal
        isOpen={openModal}
        closeModal={() => setOpenModal(false)}
        movieId={movieId}
      />
    </div>
  );
}
