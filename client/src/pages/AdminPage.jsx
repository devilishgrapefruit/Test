import React from 'react'
import { useState } from 'react';
import {Table, Container, Button, Row} from 'react-bootstrap';
import { ManageCategory } from '../components/modals/ManageCategory';
import { ManageGame } from '../components/modals/ManageGame';
import { Header } from '../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../redux/slices/users';
import { User } from '../components/User'

export const AdminPage = () => {
  const dispatch = useDispatch()
  const [categoryVisible, setCategoryVisible] = useState(false)
  const [gameVisible, setGameVisible] = useState(false)
  const {users} = useSelector(state => state.users)
  const isUsersLoading = users.status === 'loading'

  React.useEffect(() => {
  dispatch(fetchUsers())
  }, [])


  return (
    <div>
      <Header/>
    <Container className="d-flex justify-content-center">
      <Row>
      <Button size="lg" variant="light" className="mt-2" onClick={() => setGameVisible(true)}>Добавить настольную игру</Button>
      <Button size="lg" variant="light" className="mt-2" onClick={() => setCategoryVisible(true)}>Добавить категорию игр</Button>
      </Row>
      <ManageCategory show={categoryVisible} onHide={() => setCategoryVisible(false)}/>
      <ManageGame show={gameVisible} onHide={() => setGameVisible(false)}/>
    </Container>
    <Container>
      <h2 className="mt-4"> Таблица пользователей</h2>
    <Table className="mt-4" bordered size="sm" variant="light">
      <thead>
      <tr>
          <th>№</th>
          <th>Имя</th>
          <th>Email</th>
          <th>Роль</th>
          <th>Опции</th>
        </tr>
      </thead>
      <tbody>
    {(isUsersLoading ? [...Array(5)]: users.items).map((user, index) => 
            isUsersLoading ? 
              <User isLoading={true}/> 
             : <User
              i={index}
              id={user._id}
              fullName={user.fullName}
              email={user.email}
              password={user.password}
              role={user.role}
              avatarUrl= {user.avatarUrl}
              createdAt={user.createdAt}
              updatedAt={user.createdAt}
             />
            
            )
            }
            </tbody>
    </Table>
    </Container>
    </div>
  )
}
