import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Clear'
import IconButton from '@mui/material/IconButton'
import { Link } from 'react-router-dom';
import { deleteUser } from '../redux/slices/users';
import { useDispatch } from 'react-redux';

export const User = ({
    i,
    id,
    fullName,
    email,
    role,
    password,
    avatarUrl,
    createdAt, 
    updatedAt, 
    isLoading,
    isEditable

}) => {
    const dispatch = useDispatch()

    if (isLoading) {
        return <tr>
        <td>{i}</td>
        <td>Loading..</td>
        <td>Loading..</td>
        <td>Loading..</td>
        <td>Loading..</td>
      </tr>
    }

    const onClickRemove = () => {
        if (window.confirm('Вы действительно хотите удалить пользователя?')) {
            dispatch(deleteUser(id))
        }
        
    }
return (
    <tr>
                <td>{i}</td>
                <td>{fullName}</td>
                <td>{email}</td>
                <td>{role}</td>
                <td>
        <Link to={`/users/${id}/edit`}>
        <IconButton color="primary">
      <EditIcon />
    </IconButton>
    </Link>
    <IconButton onClick={onClickRemove} color="secondary">
    <DeleteIcon />
  </IconButton>
  </td>
              </tr>
)
}