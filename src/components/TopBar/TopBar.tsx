import React from 'react'
import { Link } from 'react-router-dom'
import './TopBar.css'
import pelisplus from '../../constants/pelisplus.png'
import { ROUTES } from '../../routes/constants'

const TopBar = () => {
    return (
        <div className='top-bar'>

            <Link to ={ROUTES.HOME} >
                <img src={pelisplus} alt="" />
            </Link>
            <div>
                <Link to ={ROUTES.HOME} className='top-tags'>Home</Link>
                <Link to ={ROUTES.POPULAR} className='top-tags'>Popular</Link>
                <Link to ={ROUTES.TOP_RATED} className='top-tags'>Top Rated</Link>
                <Link to ={ROUTES.NOW_PLAYING} className='top-tags'>Now Playing</Link>
                <Link to ={ROUTES.FAVORITES} className='top-tags'>Favorites</Link>
            </div>

            

        </div>
    )
}

export default TopBar