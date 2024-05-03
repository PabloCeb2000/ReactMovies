import React, {useEffect, useState} from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { IMovieDetail } from "./types";
import { getDetails } from "../../services";
import { MovieCard } from "../../components/MovieCard";

const Favorites = () => {
    const [loading, setLoading] = useState(true);
    const [show, setShow] = useState<IMovieDetail[]>([]);
    const favorites: string = localStorage.getItem("favorites") || ' ';

    const runGetFavorites = async () => {
        if(favorites.length){
            const favoritesArray = JSON.parse(favorites);
            const newShows = await Promise.all(
                favoritesArray.map(async (favorite: string) => {
                    return getDetails(String(favorite))
                        .then((res) => {
                            if (res && res.data) {
                                return res.data;
                            }
                        })
                        .catch((err) => {
                            err = err.response;
                        });
            }));

            setShow(newShows);
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        runGetFavorites();
        setLoading(false);

    }, []);

    return (
        <div>
            <h2>Favorites</h2>
            {favorites && favorites.length > 2 ? (
                <div>
                    {show && show.map((show: IMovieDetail) => (
                        <MovieCard
                            key={show.id}
                            movieId={show.id}
                            title={show.title}
                            genreId={show.genres[0].id}
                            votesAverage={show.vote_average}
                            posterPath={show.poster_path}
                        />
                    ))}
                </div>
            ):(
                <div>
                    No favorites
                </div>
            )} 

        </div>


    )
}

export default Favorites;

