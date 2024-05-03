import React, {useEffect, useState} from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { IMovieCard } from "../../components/MovieCard/types";
import { IMovieDetail } from "./types";

const Favorites = () => {
    const [loading, setLoading] = useState(true);
    const [show, setShow] = useState<IMovieDetail[]>([]);
    const favorites: string = localStorage.getItem("favorites") || '';

    const runGetFavorites = async () => {
        if(favorites.length){
            const favoritesArray = JSON.parse(favorites);
            const newShows = await Promise.all(favoritesArray.map(async (favorite: string) => {
                
            }));
            setShow(newShows);
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        runGetFavorites();
    }, []);

    return (
        <div>
            xd
        </div>
    )
}

export default Favorites;