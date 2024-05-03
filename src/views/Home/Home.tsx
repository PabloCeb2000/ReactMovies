import React, { useEffect, useState } from "react";
import { MovieCard } from '../../components/MovieCard'
import { getPopular } from "../../services";
import { IMovieResponse } from "./types";
import '../../components/PopularMovies/PopularMovies.css'

const Home: React.FC = () =>{

    const [movies, setMovies] = React.useState<IMovieResponse[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const getPopularMovies = async () => {
        await getPopular()
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
        getPopularMovies();
        setIsLoading(false);
    }, []);

    return(
        <div className='main-popular'>
            <div className='title-popular'>
                
                <div className="name-popular">
                    <h1>Populares</h1>
                </div>
                
                <div>
                    <button className='button-popular'>Ver mas</button>
                </div>
                
            </div>
            <div className='cards-popular'>
                {movies?.length > 0 && movies.slice(0, 10).map((movie) => (
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
}

export default Home