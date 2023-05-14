import classes from "../App.module.css"
import { IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Clear'
import { useDispatch } from "react-redux"
import { deleteItem } from "../redux/slices/basket"
import { useNavigate } from "react-router-dom"
export const OrderItem = (
    {id,
    name,
    cost, 
    imageUrl,
    }) => {
        const dispatch = useDispatch()
        const navigate = useNavigate()
        const onClickRemove = () => {
            if (window.confirm('Вы действительно хотите удалить игру из корзины?')) {
                dispatch(deleteItem(id))
                navigate('/')
            }
          }

    return (
        <div style={{width: '30em'}} className="d-flex justify-content-around">
            <img className="d-flex mt-3" style={{width: '8em', height: '8em'}} src={imageUrl}/> 
            <div className="d-flex justify-content-center flex-column">
                <h4 className={classes.titleAuth}>
                    {name}
                </h4>
                <h4 className={classes.titleAuth}>
                {cost} руб.
                </h4>
            </div>
            <IconButton onClick={onClickRemove} color="secondary">
    <DeleteIcon />
  </IconButton>
        </div>
    )
}