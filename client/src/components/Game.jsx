import {Card} from "react-bootstrap"
import Image from "react-bootstrap/Image"
import classes from '../App.module.css'
import { GameSkeleton } from "./GameSkeleton"
import Button from 'react-bootstrap/Button'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Clear'
import IconButton from '@mui/material/IconButton'
import { useDispatch } from "react-redux"
import { deleteGame } from "../redux/slices/games"
import { Link } from "react-router-dom"
import { addOrder } from "../redux/slices/basket"

export const Game = ({
    id,
    name,
    cost, 
    description,
    category,
    imageUrl,
    user,
    createdAt, 
    updatedAt, 
    isLoading,
    isEditable

}) => {
    const dispatch = useDispatch()

    if (isLoading) {
        return <GameSkeleton/>
    }

    const onClickRemove = () => {
        if (window.confirm('Вы действительно хотите удалить игру?')) {
            dispatch(deleteGame(id))
        }
    }

    const onClickAdd = async () => {
        try {
            dispatch(addOrder(id))
            alert('Товар добавлен')
        } catch (err) {
            console.warn(err)
            alert('Ошибка при добавлении в корзину')
        }

    }

return (
    <Card className={classes.card} style={{width: 200, cursor: 'pointer'}} border={"light"}>
                <Image className={classes.cardImg} width={200} height={200} src={imageUrl}/>
               {isEditable && (
               <div className={classes.editButtons}>
                <Link to={`/games/${id}/edit`}>
                <IconButton color="primary">
              <EditIcon />
            </IconButton>
            </Link>
            <IconButton onClick={onClickRemove} color="secondary">
            <DeleteIcon />
          </IconButton>
          </div>
          )}
                <hr/>
                <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
                <div>{category?.title}</div>
                </div>
                <Link className={classes.cardText} to={`/games/${id}`}>
                <div>{name}</div>
                </Link>
                <div>{cost} рублей</div>
                <Button onClick={onClickAdd} className="mt-2" type="submit">В корзину</Button>
            </Card> 
)

}
