import React from 'react'
import classes from '../App.module.css';

export const Container = (props) => {
  return (
    <div className={classes.center}>
    <div className={classes.cont}>
        <img src={props.image} className={classes.cont_image}/>
        <div className={classes.div_text}> 
        <p className={classes.cont_h}>{props.h}</p>
        <p className={classes.cont_text}>{props.text}</p>
        </div>
  </div>
  </div>
  )
  }

  Container.defaultProps = { image: "/images/loading.gif", h:"Какой-то заголовок" , text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tristique fringilla neque nec consequat. Curabitur diam est, vestibulum eget sem in, sagittis scelerisque lectus."}