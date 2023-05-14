import { Container, Row, Col, Button} from "react-bootstrap"
import React from "react"
import { Header } from "../components/Header"
import { useSelector } from "react-redux"
import { fetchAuthMe, selectIsAuth } from "../redux/slices/auth"
import { useDispatch } from "react-redux"
import { useState } from "react"
import { ManageUser } from "../components/modals/ManageUser"

export const ProfilePage =  () => {
  const dispatch = useDispatch()
  const [userVisible, setUserVisible] = useState(false)
  const auth = useSelector(state => state.auth.data)
  const isProfileLoading = auth.status === 'loading'
  
    return (
      <div>
        <Header/>
      <Container className="d-flex justify-content-center">
        <Row className="d-flex flex-column">
          <Col>
          {isProfileLoading ?
          <img src={auth.avatarUrl} style={{width: '15em', height: '15em'}}/> :
      <img src="/images/avatar.png" style={{width: '15em', height: '15em'}}/>
          }</Col>
      <Col>
      {isProfileLoading ? 
      <p>Loading...</p>
      :
      <p>{auth.fullName}</p>}
      </Col>
      {console.log(auth)}
      </Row>
      <Row className="d-flex flex-column">
        <Col>
        <h4>Данные профиля</h4>
        </Col>
        <Col>
        {isProfileLoading ? 
        <p>Емайл</p>
        : <p>{auth.email}</p>
        }
        {isProfileLoading ? 
        (<p>Дата регистрации</p>)
        : (
        <p>Дата регистрации</p> &&
        <p>{new Date (auth.createdAt).toDateString()}</p>)
        }
        </Col>
      </Row>
      <Row>
        <Col>
        <h4>Настройки</h4>
        <Button size="lg" variant="light" className="mt-2" onClick={() => setUserVisible(true)}>Редактировать данные</Button>
        <ManageUser show={userVisible} onHide={() => setUserVisible(false)}/>
        </Col>
      </Row>
      </Container>
      </div>
      
    )
  }
  