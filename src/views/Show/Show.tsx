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
      if(Favorites.length > 0){
        const favs = JSON.parse(Favorites); 
        const newFavs = [...favs, id];
        setFavorites(JSON.stringify(newFavs));
        setIsFavorite(true);
        localStorage.setItem('favorites', JSON.stringify(newFavs));
      }
    };

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
      if(favs.includes(String(id))){
        setIsFavorite(true);
      }

    }, []);

  return (

    <div>
        <div> Show: {id} </div>
        <div> Título desde el state: {location.state.movieName}</div>
        {isFavorite ? (
          <button onClick={removeFavorite}> Quitar de favoritos </button>
        ) : (
          <button onClick={addFavorite}> Agregar a favoritos </button>
        
        )}
        <div onClick={goBack}> Volver </div>0
        
    </div>
  )
}

export default Show
