import {useForm} from 'react-hook-form'
import classes from '../App.module.css'
import { LOGIN_ROUTE, REGISTER_ROUTE} from '../utils/const'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import React from "react";
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import { fetchAuth, selectIsAuth, fetchRegister, selectIsAdmin } from '../redux/slices/auth'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
export const AuthPage = () => {
  const location = useLocation()
  const isLogin = location.pathname === LOGIN_ROUTE
  const isAuth = useSelector(selectIsAuth)
  const isAdmin = useSelector(selectIsAdmin)

  const dispatch = useDispatch()
  const {register, handleSubmit, setError, formState: {errors, isValid} } = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    mode: 'onChange'
  })
  const onSubmitAuth = async (values) => {
    const data = await dispatch(fetchAuth(values));
    if (!data.payload) {
      return alert('Не удалось авторизоваться')
    }

    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token)
    }
  }
  const onSubmitReg = async (values) => {
    const data = await dispatch(fetchRegister(values));
    if (!data.payload) {
      return alert('Не удалось зарегистрироваться')
    }

    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token)
    }
  }

  if (isAuth) {
    return  <Navigate to="/"/>
  }
  return (
    <main className="form-signin w-100 m-auto align-items-center d-flex justify-content-center">
    <form onSubmit={!isLogin ? handleSubmit(onSubmitReg) : handleSubmit(onSubmitAuth)}>
    <NavLink to="/">
    <img className={classes.logoAuth} src='/images/logo.png' alt="dice"/>
    </NavLink>
    <h1 className={classes.titleAuth}>{isLogin ? 'Авторизация' : 'Регистрация'}</h1>
    {!isLogin ? 
    <TextField style={{background: "#ffffff"}} className=" mt-2 w-60"
    label="Имя" 
    error={Boolean(errors.fullName?.message)} 
    variant="filled"
    helperText={errors.fullName?.message}
    type="name"
    {...register('name')}
    fullWidth
    /> 
    :
    null
    }
    <TextField style={{background: "#ffffff"}} className="mt-2 w-60"
    label="Email" 
    error={Boolean(errors.email?.message)} 
    helperText={errors.email?.message}
    type="email"
    variant="filled"
    {...register('email')}
    fullWidth
    required/>
    <TextField style={{background: "#ffffff"}} className="mt-2 w-60"
    label="Пароль"
     error={Boolean(errors.password?.message)}
     helperText={errors.password?.message}
     variant="filled"
     type="password"
     {...register('password')}
     fullWidth
     required/>
     {isLogin ?
    <Button className="mt-2 w-100 btn btn-lg btn-primary" type="submit" size="large" variant="contained" fullWidth> Войти
     </Button> :
     <Button className="mt-2 w-100 btn btn-lg btn-primary"type="submit" size="large" variant="contained" fullWidth> Зарегистрироваться
     </Button>}
    {isLogin ? 
    <div className="mt-2 fs-5">Нет аккаунта?  <NavLink to={REGISTER_ROUTE}>Зарегистрируйся</NavLink></div>
   : 
<div className="mt-2 fs-5">Есть аккаунт?  <NavLink to={LOGIN_ROUTE}>Войти</NavLink></div>
 }
   </form> 

  </main>
  )
}

