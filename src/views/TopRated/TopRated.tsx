import React, { useEffect, useState } from "react";

import { getTopRated } from "../../services";
import { IMovieResponse } from "./types";
import { MovieCard } from "../../components/MovieCard";

const TopRated: React.FC = () => {
    const [movies, setMovies] = React.useState<IMovieResponse[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const getTopRatedMovies = async () => {
        await getTopRated()
        .then((data) => {
            if (data && data.data){
                setMovies(data.data.results);

            }
        })
        .catch((err) => {
            console.log(err);
        });

    };

    useEffect(() => {
        setIsLoading(true);
        getTopRatedMovies();
        setIsLoading(false);
    }, []);

    return (
        <div className='main-popular'>
            {isLoading && <div>Loading...</div>}
            <div className='title-popular'>
                Más votadas
            </div>
            <div className='cards-no'>
                {movies?.length > 0 && 
                    movies.map((movie) => (
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
    )
};

export default TopRated;