import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addGame, updateGame } from "../../redux/slices/games";
import { FormControl, TextField, Select, InputLabel, MenuItem } from "@mui/material";
import host from "../../axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { ADMIN_ROUTE, PROFILE_ROUTE } from "../../utils/const";
import { userId } from "../../redux/slices/auth";
export const ManageUser = ({show, onHide}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [fullName, setFullName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [role, setRole] = React.useState('')
    const [avatarUrl, setAvatarUrl] = React.useState('https://board-games-kcvd.onrender.com/uploads/avatar.png')
    const [isLoading, setLoading] = React.useState(false)
    const thisUserid = useSelector(userId)
    const {id} = useParams()
    const isEditable = Boolean(id)
    

    const inputFileRef = React.useRef(null);

    const handleChangeFile = async(event) => {
        try {
            const formData = new FormData()
            const file = event.target.files[0]
            formData.append('image', file)
            const {data} = await host.post('/upload', formData)
            setAvatarUrl("http://localhost:7000" + data.url)
        } catch (err) {
            console.warn(err)
            alert('Ошибка при загрузке файла')
        }
    }

    const onClickRemoveImage = () => {
        setAvatarUrl('')
    }
    

    const onSubmit = async () => {
        try {
        setLoading(true)

        const values = {
            fullName,
            email,
            password,
            role,
            avatarUrl,
        }
    
        navigate(PROFILE_ROUTE)
        } catch (err) {
            console.warn(err)
            alert('Ошибка при редактировании данных')

        }
      }

      React.useEffect(() => {
        if (id || !isEditable) {
            host.get(`/users/${isEditable ? id : thisUserid}`).then(({data}) => {
                setFullName(data.fullName)
                setEmail(data.email)
                setRole(data.role)
                setAvatarUrl(data.avatarUrl)
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
                    {isEditable ? 'Редактировать пользователя' : 'Изменить данные'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                <TextField style={{background: "#ffffff"}} className=" w-60"
                label="Имя" 
                variant="standard"
                type="name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)} 
                fullWidth/> 
                <TextField style={{background: "#ffffff"}} className="mt-3 w-60"
                label="Email" 
                variant="standard"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} required
                fullWidth/> 
                {isEditable &&
                <TextField style={{background: "#ffffff"}} className="mt-3 w-60"
                label="Роль" 
                variant="standard"
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)} 
                fullWidth/> }
                <TextField style={{background: "#ffffff"}} className="mt-2 w-60"
                label="Новый пароль" 
                variant="standard"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth/> 
                <div className="d-flex justify-content-center gap-3">
                <Button className="mt-4 w-60" onClick={() => inputFileRef.current.click()} variant="outline-success" 
                size="sl">Добавить аватарку</Button>

                <input ref={inputFileRef} type="file" onChange={(handleChangeFile)} hidden
                />
                {avatarUrl && (
                  <Button className="mt-4 w-60" onClick={onClickRemoveImage} variant="outline-danger" 
                  size="sl">Удалить</Button>  
                )}
                </div>
                <div>
                {(avatarUrl && avatarUrl !== 'https://board-games-kcvd.onrender.com/uploads/avatar.png') && (
                  <img src={avatarUrl} className="mt-4" style={{height: '20em', width: '20em'}} alt="Uploaded"/>
                )}
                </div>
                    <Modal.Footer className="mt-3">
                    <Button variant="outline-success" type="submit" onClick={onSubmit}>Редактировать</Button>
                    <Link to={ isEditable ? ADMIN_ROUTE : PROFILE_ROUTE}>
                    <Button variant="outline-danger" onClick={onHide} >Закрыть</Button>
                    </Link>
                    </Modal.Footer>
                </form>
              </Modal.Body>
              </Modal>

    )
}