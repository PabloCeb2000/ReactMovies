import React from 'react'
import { Link } from 'react-router-dom'
import './TopBar.css'
import pelisplus from '../../constants/pelisplus.png'
import { ROUTES } from '../../routes/constants'

const TopBar = () => {
    return (
        <div className='top-bar'>
            <div className='flex items-center text-3xl'>
                <Link to ={ROUTES.HOME} >
                    <img src={pelisplus} alt="pelisplus" />
                </Link>
                'NT
            </div>


            <div>
                <Link to ={ROUTES.HOME} className='top-tags'>Home</Link>
                <Link to ={ROUTES.POPULAR} className='top-tags'>Populares</Link>
                <Link to ={ROUTES.TOP_RATED} className='top-tags'>Mas Votadas</Link>
                <Link to ={ROUTES.NOW_PLAYING} className='top-tags'>Cartelera</Link>
                <Link to ={ROUTES.FAVORITES} className='top-tags'>Favoritas</Link>
            </div>

            

        </div>
    )
}

export default TopBar