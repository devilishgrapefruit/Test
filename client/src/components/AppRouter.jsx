import { Routes, Route} from 'react-router-dom';
import { authRoutes, adminRoutes, publicRoutes } from '../routes';
import { useSelector } from 'react-redux';
import { selectIsAuth, selectIsAdmin } from '../redux/slices/auth';
export const AppRouter = () => {
    const isAuth = useSelector(selectIsAuth)
    const isAdmin = useSelector(selectIsAdmin)
    return (
        <Routes>
            {isAuth && authRoutes.map(({path, Component}) => 
            <Route key={path} path={path} element={Component} exact/>
            )}
            {isAdmin && adminRoutes.map(({path, Component}) => 
            <Route key={path} path={path} element={Component} exact/>
            )}
            {publicRoutes.map(({path, Component}) =>
            <Route key={path} path={path} element={Component} exact/>
            )}
        </Routes>
    )
}