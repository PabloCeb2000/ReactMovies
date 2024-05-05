import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { MovieCard } from '../../components/MovieCard'
import { getPopular } from "../../services";
import { getTopRated } from "../../services";
import { getNowPlaying } from "../../services";
import { IMovieResponse } from "./types";
import './Home.css'
import pelis from '../../constants/pelisplusplus.jpg'

const Home: React.FC = () =>{
    const [moviesP, setMoviesP] = React.useState<IMovieResponse[]>([]);
    const [moviesT, setMoviesT] = React.useState<IMovieResponse[]>([]);
    const [moviesN, setMoviesN] = React.useState<IMovieResponse[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const getPopularMovies = async () => {
        await getPopular()
        .then((data) => {
            if (data && data.data){
                setMoviesP(data.data.results);

            }
        })
        .catch((err) => {
            console.log(err);
        });

    };

    const morePopular = () => {
        navigate('/popular');
    };

    const getTopRatedMovies = async () => {
        await getTopRated()
        .then((data) => {
            if (data && data.data){
                setMoviesT(data.data.results);

            }
        })
        .catch((err) => {
            console.log(err);
        });

    };

    const moreTopRated = () => {
        navigate('/TopRated');
    };

    const getNowPlayingMovies = async () => {
        await getNowPlaying()
        .then((data) => {
            if (data && data.data){
                setMoviesN(data.data.results);

            }
        })
        .catch((err) => {
            console.log(err);
        });

    };

    const moreNowPlaying = () => {
        navigate('/NowPlaying');
    };

    useEffect(() => {
        getPopularMovies();
        getTopRatedMovies();
        getNowPlayingMovies();
    }, []);


    return(
        <div className='main' >
            <div className="section">
                <div className='title'>
                    
                    <div className="name">
                        <h1>Populares</h1>
                    </div>
                    
                    <div>
                        <button className='button' onClick={morePopular}>Ver mas</button>
                    </div>
                    
                </div>
                <div className='cards'>
                    {moviesP?.length > 0 && moviesP.slice(0, 10).map((movie) => (
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

            <div className="section">
                <div className='title'>
                    
                    <div className="name">
                        <h1>Mejores Calificadas</h1>
                    </div>
                    
                    <div>
                        <button className='button' onClick={moreTopRated}>Ver mas</button>
                    </div>
                    
                </div>
                <div className='cards'>
                    {moviesT?.length > 0 && moviesT.slice(0, 10).map((movie) => (
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

            <div className="section">
                <div className='title'>
                    
                    <div className="name">
                        <h1>Cartelera</h1>
                    </div>
                    
                    <div>
                        <button className='button' onClick={moreNowPlaying}>Ver mas</button>
                    </div>
                    
                </div>
                <div className='cards'>
                    {moviesN?.length > 0 && moviesN.slice(0, 10).map((movie) => (
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

export default Home