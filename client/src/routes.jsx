import { ADMIN_ROUTE, LOGIN_ROUTE, REGISTER_ROUTE, BASKET_ROUTE, PROFILE_ROUTE, SHOP_ROUTE, GAME_ROUTE, CATEGORY_ROUTE, DEFAULT_ROUTE, ABOUT_ROUTE, USER_ROUTE } from "./utils/const";
import { AdminPage } from "./pages/AdminPage";
import { BasketPage } from "./pages/BasketPage";
import { ProfilePage } from "./pages/ProfilePage";
import { AuthPage } from "./pages/AuthPage";
import { ShopPage } from "./pages/ShopPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { GamePage } from "./pages/GamePage";
import { ManageGame } from "./components/modals/ManageGame";
import { ManageCategory } from "./components/modals/ManageCategory";
import { ManageUser } from "./components/modals/ManageUser";
import { AboutPage } from "./pages/AboutPage";


export const authRoutes = [
    {
        path: PROFILE_ROUTE,
        Component: <ProfilePage/>,
    },
]

export const adminRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: <AdminPage/>,
    }, 
    {
        path: GAME_ROUTE + '/:id' + '/edit',
        Component: <ManageGame show={true}/>,
    },
    {
        path: CATEGORY_ROUTE + '/:id' + '/edit',
        Component: <ManageCategory show={true}/>,
    },
    {
        path: USER_ROUTE + '/:id' + '/edit',
        Component: <ManageUser show={true}/>,
    },
]

export const publicRoutes = [
    {
        path: SHOP_ROUTE,
        Component: <ShopPage/>,
    },
    {
        path: REGISTER_ROUTE,
        Component: <AuthPage/>,
    },
    {
        path: LOGIN_ROUTE,
        Component: <AuthPage/>,
    },
    {
        path: GAME_ROUTE + '/:id',
        Component: <GamePage/>,
    },
    {
        path: GAME_ROUTE + '/category' + '/:categoryId',
        Component: <ShopPage/>,
    },
    {
        path: DEFAULT_ROUTE,
        Component: <ShopPage/>,
    },
    {
        path: ABOUT_ROUTE,
        Component: <AboutPage/>,
    },
    {
        path: '*',
        Component: <NotFoundPage/>,
    },
    {
        path: BASKET_ROUTE,
        Component: <BasketPage/>,
    },
    {
        path: BASKET_ROUTE + '/:id',
        Component: <BasketPage/>,
    }

]
