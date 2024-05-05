import { RouteObject, createBrowserRouter } from "react-router-dom";
import PrivateRouter from "./PrivateRouter";
import { ROUTES } from "./constants";
import { Home } from "../views/Home";
import PublicRouter from "./PublicRouter";
import { Popular } from "../views/Popular2";
import { Show } from "../views/Show";
import { TopRated } from "../views/TopRated";
import { NowPlaying } from "../views/NowPlaying";
import { Favorites } from "../views/Favorites";

const routes: RouteObject[] = [
    {
        path: ROUTES.HOME, element: <PrivateRouter />,
        children: [
            {path: ROUTES.HOME, element: <Home />},
            {path: ROUTES.POPULAR, element: <Popular />},
            {path: ROUTES.TOP_RATED, element: <TopRated />},
            {path: ROUTES.NOW_PLAYING, element: <NowPlaying />},
            {path: ROUTES.FAVORITES, element: <Favorites />},            
            {path: `${ROUTES.SHOW}:id`, element: <Show />}
        ]
        
    },
    {
        path: '/', 
        element: <PublicRouter />,
        children: [{path: '/', element: <Home />}],

    }

];

export const router = createBrowserRouter(routes);