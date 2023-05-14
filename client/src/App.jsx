import React from 'react';
import classes from './App.module.css';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './components/AppRouter';
import { useDispatch, useSelector, useEffect } from 'react-redux'
import { fetchAuthMe, selectIsAuth } from './redux/slices/auth';
const App = () => {
  const dispatch = useDispatch()
  const isAuth = useSelector(selectIsAuth)
  console.log(isAuth)
  React.useEffect(() => {
    dispatch(fetchAuthMe())
  }, [])
  return (
    <BrowserRouter>
    <div className={classes.App}>
      <div className={classes.body}>  
      <AppRouter/>
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
