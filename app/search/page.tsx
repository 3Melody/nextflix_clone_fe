'use client';

import React, { useState , useEffect } from 'react'
import Thumbnail from '../../components/thumbnail_component';
import { useParams } from 'next/navigation';
import MovieDetailModal from '../../components/popup_movie_detail';
import UiState from '../../components/stateMenage/UiState';
import { useUi } from '../../components/stateMenage/UiProvider';
import { useTranslation } from 'react-i18next';


export default function SearchPage() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [movieTotal , setMovieTotal] = useState(0);
  const [movies , setMovies] = useState([]);
  const [keyword , setKeyword] = useState('');
  const [movieId, setMovieId] = useState(Number(0));
  const [openModal, setOpenModal] = useState(false);
  const { setLoadingOverlay, setError } = useUi();
  const [mounted, setMounted] = useState(false);
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(false);

    useEffect(() => {
      setMounted(true);
    }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const lastSearch = localStorage.getItem('lastSearch') || '';
      setKeyword(lastSearch);
      if (lastSearch) {
        fetchMovies(lastSearch);
      }
    };

    // Initial load
    handleStorageChange();

    window.addEventListener('lastSearchChange', handleStorageChange);

    return () => window.removeEventListener('lastSearchChange', handleStorageChange);
  
  }, []); // Remove keyword dependency to prevent infinite loops

  const showModalDetails = (movieId: number) => {
  setMovieId(movieId);
  setOpenModal(true);
};

  const fetchMovies = async (query : string) => {
    try {
      setLoadingOverlay(true);
      setLoading(true);
      const response = await fetch(`${apiUrl}/movies/search/${query}`);
      const data = await response.json();
    
      if (!response.ok) {
        setError(data.message || 'Failed to fetch movies');
        return;
      }
      setMovies(data);
      setMovieTotal(data.length);
      setLoadingOverlay(false);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };
  
  return (
    <div>
      <div className="xl:pt-20 xl:px-13 pt-40 px-5 pb-5 ">
        <div className="text-xl font-bold">{mounted ? t('searchData') : 'Search result'}  {movieTotal}</div>
        {(movies.length === 0 && !loading) ? ( <div className='text-xl font-bold flex justify-center items-center h-[80vh]'>{mounted ? t("noData") : "No Data"}</div>): (
           <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 mt-5 h-100">
          {movies.map((movie: any) => (
            <div key={movie.id} onClick={() => showModalDetails(movie.id)}>
              {" "}
              <Thumbnail image={movie.posterUrl} title={movie.title} />
            </div>
          ))}
        </div>
        )}
       
      </div>
      <MovieDetailModal
        isOpen={openModal}
        closeModal={() => setOpenModal(false)}
        movieId={movieId}
      />
    </div>
  );
}
