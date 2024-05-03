import React, { useEffect, useState } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'

const Show: React.FC = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const [show, setShow] = useState<any>([]);
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

    useEffect(() => {
      const favs = localStorage.getItem('favorites') || '';
      setFavorites(favs);
      if (favs.includes(String(id))) {
          setIsFavorite(true);
      }
      setLoading(true);
      // getDetails();
  }, []);

  return (

    <div>
        <div> Show: {id} </div>
        <div> Título desde el state: {location.state.movieName}</div>
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
        <div onClick={goBack}> Volver </div>
        
    </div>
  )
}

export default Show
