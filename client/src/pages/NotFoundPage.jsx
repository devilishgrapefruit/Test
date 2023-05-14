import React from 'react'
import classes from '../App.module.css';
import { Header } from '../components/Header';
export const NotFoundPage = (isLoading) => {
    return(
        <div>
            {!isLoading ? <Header/> : null}
        <div className={classes.center}>
  <div className={classes.ring}>Loading
  <span className={classes.spanr}></span>
</div>
        </div>
        </div>
    );
}
