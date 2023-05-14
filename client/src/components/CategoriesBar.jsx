import React from "react"
import { ListGroup, ListGroupItem, Card } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";
import { fetchCategories } from "../redux/slices/games"
import Button from 'react-bootstrap/Button'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Clear'
import IconButton from '@mui/material/IconButton'
import { Link } from "react-router-dom"
import classes from "../App.module.css"
import { Category } from "./Category";

export const CategoriesBar = ({items, isLoading = true}) => {
    const dispatch = useDispatch()
    const {games, categories} = useSelector((state) => state.games)
    const isCategoriesLoading = categories.status === 'loading'
    const userData = useSelector((state) => state.auth.data)
    
  React.useEffect(() => {
  dispatch(fetchCategories())
  }, [])
 
    return (
        <Card>
        <ListGroup>
            {(isCategoriesLoading ? [...Array(5)] : categories.items).map((category, i) =>
            isCategoriesLoading ?
            (<Category key={i} isLoading={true}/>) :
            (<Category 
                key={i} 
                id={category._id}
              title={category.title}
              user={category.user}
              createdAt={category.createdAt}
              updatedAt={category.updatedAt}
              isEditable={userData?._id === category.user}
              />)
            
            ) }

        </ListGroup>
        </Card>
    )
}