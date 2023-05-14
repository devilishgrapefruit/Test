import classes from '../App.module.css'
import { Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectIsAdmin, logout, selectIsAuth } from '../redux/slices/auth'
import { ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, PROFILE_ROUTE, ABOUT_ROUTE, DEFAULT_ROUTE } from '../utils/const'
import { useNavigate } from 'react-router-dom'
export const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isAuth = useSelector(selectIsAuth)
  const isAdmin = useSelector(selectIsAdmin)
  
  const onClickLogout = () => {
    try {
    if (window.confirm('Вы действительно хотите выйти?'))
    dispatch(logout())
    window.localStorage.removeItem('token')
    navigate(DEFAULT_ROUTE)
    } catch(err) {
      console.log(err)
    }
  }

  
  return (
    <header className={classes.header}>
      {!isAdmin &&
    <img src='/images/logo.png' className={classes.logo} alt="dice"/>}
     <h2 className={classes.mytitle}><Link to="/" className={classes.home}>Настолки</Link></h2>
        <nav className={classes.menu}>
            <ul>
              {isAdmin &&
              <li className={classes.headermenu}><Link to={ADMIN_ROUTE}>Админ</Link></li>
              }
              {isAuth ? 
              <li className={classes.headermenu}><Link to={PROFILE_ROUTE}>Профиль</Link></li>
            : <li className={classes.headermenu}><Link to={ABOUT_ROUTE}>О нас</Link></li>
            }
            {isAuth ? 
            <li className={classes.headermenu}><Link to={BASKET_ROUTE}>Корзина</Link></li>
            : null
            }
              {isAuth ? 
              <li className={classes.headermenu}><Link onClick={onClickLogout}>Выйти</Link></li>
              :
              <li className={classes.headermenu}><Link to={LOGIN_ROUTE}>Войти</Link></li>
              }
            </ul> 
        </nav> 
</header>
  )
}
