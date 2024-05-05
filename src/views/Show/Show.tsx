import React, { useEffect, useState } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { getDetails } from '../../services';
import { IMovieDetail, IMovieResponse } from "./types";
import { getSimilar } from '../../services';
import './Show.css';
import { MovieCard } from '../../components/MovieCard';

const Show: React.FC = () => {
    const poster = 'https://image.tmdb.org/t/p/w500/';
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const [show, setShow] = useState<IMovieDetail>({} as IMovieDetail);
    const [loading, setLoading] = useState<boolean>(true);
    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    const [Favorites, setFavorites] = React.useState<string>('');
    const [similar, setSimilar] = useState<IMovieResponse[]>([]);

    const rating = () => {
      return show.adult ? '18+' : 'Para todos';
    };

    const goBack = () => {
        navigate(-1);
    };


    const addFavorite = () => {
      const favs = Favorites.length > 0 ? JSON.parse(Favorites) : [];
      const newFavourites = [...favs, id];
      setFavorites(JSON.stringify(newFavourites))
      setIsFavorite(true);
      localStorage.setItem('favorites', JSON.stringify(newFavourites))
  }

    const removeFavorite = () => {
      const favs = Favorites.length > 0 ? JSON.parse(Favorites) : [];
      let newFavorites = [...favs];
      newFavorites = newFavorites.filter((e) => e !== id);
      setFavorites(JSON.stringify(newFavorites));
      setIsFavorite(false);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
    }

    const runGetDetails = async () => {
      const res = await getDetails(String(id));
      if (res && res.data) {
        setShow(res.data);
      }
      else{
        console.log('Error');
      }
    
    }

    const getSimilarMovies = async () => {
      const res = await getSimilar(String(id));
      if (res && res.data) {
        setSimilar(res.data.results);
      }
      else {
        console.log('Error');
      }
    
    }

    useEffect(() => {
      
      const favs = localStorage.getItem('favorites') || '';
      setFavorites(favs);
      if (favs.includes(String(id))) {
        setIsFavorite(true);
      }
      runGetDetails();
      getSimilarMovies();

  }, [id]);

  return (
    <div className='main-show'>
      <div className='first-part-show'>
        <div className='poster-show'>
          <img className='rounded-lg' src={poster + show.poster_path} alt='poster' />
        </div>

        <div className='description-show' style={{width:900}}>
          <h1 className='title-show'> 
            {location.state.movieName}
          </h1>

          <div className='overview-show'>
            <span className='desc-element-show-f'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="icon-show">
                <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clip-rule="evenodd" />
              </svg>
              {show.runtime} mins.
            </span>
            <span className='desc-element-show'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="icon-show">
                <path fill-rule="evenodd" d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z" clip-rule="evenodd" />
              </svg>
              {show.release_date} 
            </span>
            <span className='desc-element-show'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="icon-show">
                <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd" />
              </svg>
              {show.vote_average} 
            </span>
            <span className='desc-element-show'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="icon-show">
                <path fill-rule="evenodd" d="M3 6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6Zm4.5 7.5a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0v-2.25a.75.75 0 0 1 .75-.75Zm3.75-1.5a.75.75 0 0 0-1.5 0v4.5a.75.75 0 0 0 1.5 0V12Zm2.25-3a.75.75 0 0 1 .75.75v6.75a.75.75 0 0 1-1.5 0V9.75A.75.75 0 0 1 13.5 9Zm3.75-1.5a.75.75 0 0 0-1.5 0v9a.75.75 0 0 0 1.5 0v-9Z" clip-rule="evenodd" />
              </svg>
              {show.vote_count} 
            </span>
            <span className='desc-element-show'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="icon-show">
                <path fill-rule="evenodd" d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z" clip-rule="evenodd" />
                <path d="M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z" />
              </svg>
              {rating()}
            
            </span>
          </div>

          <div className='simpnosis-show'>
            {show.overview}
          </div>

          <div className='rest-show'>
            <div className='generes-show'>
              <div className='title-favorite-show'>
                Generos
              </div>

              <div className='genres-show'>
                {show.genres && show.genres.map((genre) => (
                    <div className='genre-show'>
                      {genre.name}
                    </div>
                  ))}
              </div>


            </div>

            <div className='mx-10'></div>

            <div className='favorite-show'>
              <div className='title-favorite-show'>
                Favorito
              </div>
              {isFavorite ? (
                      <div className='remove-favorites-show'>
                        <button onClick={removeFavorite}>Remover de favoritos</button>
                      </div>
                  ) : (
                    <div className='add-favorites-show'>
                      <button onClick={addFavorite}>Agregar a favoritos</button>
                    </div>
                      
                  )
              }
            </div>
          </div>



          <button className='back-show' onClick={goBack}> 
            Volver 
          </button>  

        </div>        
      </div>
      

      <div className='similar-show'>
        <div className="name-similares-show">
          <h1>Peliculas Similares</h1>
        </div>
        
        <div className='cards-similar-show'>
          {similar?.length > 0 && similar.map((movie) => (
            <MovieCard
              movieId={movie.id}
              posterPath={movie.poster_path}
              title={movie.title}
              votesAverage={movie.vote_average}
              genreId={movie.genre_ids[0]}
            />                
          ))}              
        </div>
      </div>
    </div>
  )
}

export default Show
