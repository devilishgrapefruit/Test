import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { Modal, Button } from "react-bootstrap"
import { TextField } from "@mui/material"
import { addCategory } from "../../redux/slices/games"
import { useNavigate } from "react-router-dom"
import { DEFAULT_ROUTE } from "../../utils/const"
import { Link, useParams } from "react-router-dom"
import { ADMIN_ROUTE } from "../../utils/const"
import host from "../../axios"


export const ManageCategory = ({show, onHide}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {games, categories} = useSelector(state => state.games)
    const [title, setTitle] = React.useState('')
    const [isLoading, setLoading] = React.useState(false)
    const {id} = useParams()
    const isEditing = Boolean(id)

    const onSubmit = async () => {
        try {
            setLoading(true)
        const values = {
            title
        }
        const {data} = isEditing 
        ? await host.patch(`/categories/${id}`, values)
        : await dispatch(addCategory(values))
        
        navigate(DEFAULT_ROUTE)
        } catch (err) {
            console.warn(err)
            isEditing ?
            alert('Ошибка при редактировании категории') 
            : alert('Ошибка при создании категории') 
        }
      }

    return (
           <Modal 
           show={show}
           onHide={onHide}
           size="lg"
            centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                {isEditing ? 'Редактировать' : 'Добавить'} категорию
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <form>
                <TextField style={{background: "#ffffff"}} className=" w-60"
                label="Имя" 
                variant="standard"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
                required/> 
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-success" onClick={onSubmit}>{isEditing ? 'Обновить' : 'Добавить'}</Button>
                <Link to={isEditing ? DEFAULT_ROUTE : ADMIN_ROUTE}>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                </Link>
            </Modal.Footer>
            </Modal>

    )
}