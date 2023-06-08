import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addGame } from "../../redux/slices/games";
import { FormControl, TextField, Select, InputLabel, MenuItem } from "@mui/material";
import host from "../../axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { ADMIN_ROUTE, DEFAULT_ROUTE } from "../../utils/const";
export const ManageGame = ({show, onHide}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {games, categories} = useSelector(state => state.games)
    const isCategoriesLoading = categories.status === 'loading'
    const [name, setName] = React.useState('')
    const [cost, setCost] = React.useState(0)
    const [description, setDescription] = React.useState('')
    const [category, setCategory] = React.useState(null)
    const [imageUrl, setImageUrl] = React.useState('https://board-games-kcvd.onrender.com/server/uploads/no-photo.png')
    const [isLoading, setLoading] = React.useState(false)
    const {id} = useParams()
    const isEditing = Boolean(id)
    

    const inputFileRef = React.useRef(null);

    const handleChangeFile = async(event) => {
        try {
            const formData = new FormData()
            const file = event.target.files[0]
            formData.append('image', file)
            const {data} = await host.post('/upload', formData)
            setImageUrl("https://board-games-kcvd.onrender.com/server" + data.url)
        } catch (err) {
            console.warn(err)
            alert('Ошибка при загрузке файла')
        }
    }

    const onClickRemoveImage = () => {
        setImageUrl('')
    }
    

    const onSubmit = async () => {
        try {
        setLoading(true)

        const values = {
            name,
            cost, 
            category,
            description,
            imageUrl,
        }
        const {data} = isEditing 
        ? await host.patch(`/games/${id}/edit`, values)
        : await dispatch(addGame(values))

        
        const ID = isEditing ? id : data._id
        navigate(`/games/${ID}`)
        } catch (err) {
            console.warn(err)
            isEditing ?
            alert('Ошибка при редактировании игры')
            : alert('Ошибка при создании игры')

        }
      }

      React.useEffect(() => {
        if (id) {
            host.get(`/games/${id}`).then(({data}) => {
                setName(data.name)
                setCost(data.cost)
                setCategory(data.category)
                setDescription(data.description)
                setImageUrl(data.imageUrl)
            }) .catch((err) => {
                console.warn(err)
                alert('Ошибка при открытии редактора')
            })
        }
      }, [])

    return (
           <Modal 
           show={show}
           onHide={onHide}
           size="lg"
            centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                {isEditing ? 'Редактировать' : 'Добавить'} настольную игру
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                <TextField style={{background: "#ffffff"}} className=" w-60"
                label="Имя" 
                variant="standard"
                type="name"
                value={name}
                onChange={(e) => setName(e.target.value)} required
                fullWidth/> 
                <TextField style={{background: "#ffffff"}} className="mt-3 w-60"
                label="Стоимость" 
                variant="standard"
                type="number"
                value={cost}
                onChange={(e) => setCost(e.target.value)} required
                fullWidth/> 
                <TextField style={{background: "#ffffff"}} className="mt-2 w-60"
                label="Описание" 
                variant="standard"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth/> 
                <FormControl className="mt-4" fullWidth>
                <InputLabel id="demo-simple-select-label">Категория</InputLabel>
                <Select className="w-60"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={category}
                    label="Категория"
                    onChange={(e) => setCategory(e.target.value)}
                >
                    {isCategoriesLoading ? [...Array(5)] : categories.items.map((item, index) =>
                        isCategoriesLoading ?
                       <MenuItem key={index}>Loading...</MenuItem> :
                      <MenuItem key={index} value={item} >{item.title}</MenuItem>)}
                </Select>
                </FormControl>
                <div className="d-flex justify-content-center gap-3">
                <Button className="mt-4 w-60" onClick={() => inputFileRef.current.click()} variant="outline-success" 
                size="sl">Добавить изображение</Button>

                <input ref={inputFileRef} type="file" onChange={(handleChangeFile)} hidden
                />
                {imageUrl && (
                  <Button className="mt-4 w-60" onClick={onClickRemoveImage} variant="outline-danger" 
                  size="sl">Удалить</Button>  
                )}
                </div>
                <div>
                {(imageUrl && imageUrl !== 'https://board-games-kcvd.onrender.com/server/uploads/no-photo.png') && (
                  <img src={imageUrl} className="mt-4" style={{height: '20em', width: '20em'}}alt="Uploaded"/>
                )}
                </div>
                    <Modal.Footer className="mt-3">
                    <Button variant="outline-success" type="submit" onClick={onSubmit}>{isEditing ? 'Обновить' : 'Добавить'}</Button>
                    <Link to={isEditing ? DEFAULT_ROUTE : ADMIN_ROUTE}>
                    <Button variant="outline-danger" onClick={onHide} >Закрыть</Button>
                    </Link>
                    </Modal.Footer>
                </form>
              </Modal.Body>
              </Modal>

    )
}