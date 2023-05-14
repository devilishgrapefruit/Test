import React from "react"
import { ListGroup, ListGroupItem, Card } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";
import { fetchCategories, fetchGamesByCategory } from "../redux/slices/games"
import Button from 'react-bootstrap/Button'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Clear'
import IconButton from '@mui/material/IconButton'
import { Link, useNavigate } from "react-router-dom"
import classes from "../App.module.css"
import { deleteCategory } from "../redux/slices/games";

export const Category = ({
    id,
    title, 
    user,
    createdAt, 
    ipdatedAt, 
    isLoading,
    isEditable

}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    if (isLoading) {
        return <ListGroupItem style={{background: '#ffffff', height: '4em', cursor: 'pointer',  color: 'black'}}
        >Загрузка...</ListGroupItem>
    }

    const onClickRemove = () => {
        if (window.confirm('Вы действительно хотите удалить категорию?')) {
            dispatch(deleteCategory(id))
        }
        
    }

    const onClickSort = async() => {
        try{
            await dispatch(fetchGamesByCategory(id))
            navigate(`/games/category/${id}`)
        } catch(err) {
            console.warn(err)
            alert('Ошибка при сортировке по категории')
        } 
    }

    return (
        <ListGroupItem onClick={onClickSort} className={classes.category}
    style = {{background: '#ffffff', height: '4em', cursor: 'pointer',  color: 'black'}}
    > 
    {isEditable && (<div className={classes.editButtonsCategory}>
        <Link to={`/categories/${id}/edit`}>
        <IconButton color="primary">
      <EditIcon />
    </IconButton>
    </Link>
    <IconButton onClick={onClickRemove} color="secondary">
    <DeleteIcon />
  </IconButton>
  </div>)}
    {title}</ListGroupItem>)
}
