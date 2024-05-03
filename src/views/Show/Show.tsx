import React, { useEffect, useState } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { getDetails } from '../../services';
import { IMovieDetail } from "./types";
import './Show.css';

const Show: React.FC = () => {
    const poster = 'https://image.tmdb.org/t/p/w500/';
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const [show, setShow] = useState<IMovieDetail>({} as IMovieDetail);
    const [loading, setLoading] = useState<boolean>(true);
    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    const [Favorites, setFavorites] = React.useState<string>('');

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

    useEffect(() => {
      
      const favs = localStorage.getItem('favorites') || '';
      setFavorites(favs);
      if (favs.includes(String(id))) {
        setIsFavorite(true);
      }
      runGetDetails();
      setLoading(true);

  }, []);

  return (
    <div className='main-show'>
      <div className='poster-show'>
        <img className='rounded-lg' src={poster + show.poster_path} alt='poster' />
      </div>

      <div className='description-show'>
        <h1 className='title-show'> 
          {location.state.movieName}
        </h1>

        <div className='overview-show'>
          <span className='flex'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
              <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clip-rule="evenodd" />
            </svg>
            {show.runtime} mins
          </span>
          
        </div>
          {isFavorite ? (
                  <div>
                    <button onClick={removeFavorite}>Remove from Favourites</button>
                  </div>
              ) : (
                <div>
                  <button onClick={addFavorite}>Add to Favourites</button>
                </div>
                  
              )
              }

        <div onClick={goBack}> 
          Volver 
        </div>        
      </div>

        
    </div>
  )
}

export default Show
