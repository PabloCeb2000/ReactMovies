import React from 'react'
import { MovieCard } from '../MovieCard'
import { movies } from '../../constants/moviesMock'
import { IPopularMovies } from './types'
import './PopularMovies.css'

const PopularMovies: React.FC<IPopularMovies> = () =>{

    const getMovies = () => {
        let movieCards: any = []
        for (let index = 0; index < 20; index++) {
            movieCards.push(
                <MovieCard
                movieId={movies[index].id}
                posterPath={movies[index].poster_path}
                title={movies[index].title}
                votesAverage={movies[index].vote_average}
                genreId={movies[index].genre_ids[0]}
                /> 
            )
        }
        return movieCards;
            

    }

    return(
        <div className='main-popular'>
            <div className='title-popular'>
                Populares
            </div>
            <div className='cards-popular'>
                {getMovies()}
            </div>

        </div>
    )
}

export default PopularMovies