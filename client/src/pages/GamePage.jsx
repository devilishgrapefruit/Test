import {Container, Col, Image, Row, Card, Button} from 'react-bootstrap'
import { Header } from '../components/Header'
import React from 'react'
import host from '../axios'
import { NotFoundPage } from './NotFoundPage'
import { Game } from '../components/Game'
import { useParams } from 'react-router-dom'
import { addOrder } from '../redux/slices/basket'
import { useDispatch, useSelector } from 'react-redux'
import { selectIsAuth } from '../redux/slices/auth'
import classes from '../App.module.css'

export const GamePage = () => {
  const [data, setData] = React.useState()
  const [isLoading, setLoading] = React.useState(true)
  const isAuth = useSelector(selectIsAuth)
  const {id} = useParams()
  const dispatch = useDispatch()

  React.useEffect(() => {
    host.get(`/games/${id}`).then(res => {
      setData(res.data)
      setLoading(false)
    }) .catch((err) => {
      console.warn(err)
      alert('Ошибка при получении игры')
    })
  }, [])

  if (isLoading) {
    return <NotFoundPage isLoading={true}/>
  }
  const onClickAdd = async () => {
    try {
      if (!isAuth) {
     return alert('Пожалуйста, авторизируйтесь') }
        dispatch(addOrder(id))

    } catch (err) {
        console.warn(err)
        alert('Ошибка при добавлении в корзину')
    }

}
    return (
      <div>
        <Header/>
      <Container className="mt-3">
        <Row>
        <Col md={4}>
          <Image width={300} height={300} src={data.imageUrl}/>
        </Col>
        <Col md={4}>
          <Row  className="d-flex">
            <Col className="d-flex justify-content-around flex-column gap-5">
            <h2 className={classes.titleAuth} style={{marginTop: '0.8em'}}>Название</h2>
            <h2 className={classes.titleAuth} style={{color: 'rgb(81, 246, 255)'}}>{data.name}</h2>
            <h2 className={classes.titleAuth}>Категория</h2>
            <h2 className={classes.titleAuth} style={{color: 'rgb(81, 246, 255)'}}>{data.category}</h2>
            </Col>
          </Row>
        </Col>
        <Col md={4}>
          <Card className="d-flex flex-column align-items-center justify-content-around"
          style={{width: 300, height: 300, fontSize: 32, border: '5px solid lightgray'}}>
            <h3 className={classes.cost}>Cтоимость</h3>
            <h3 className={classes.cost}>{data.cost} рублей</h3>
            <Button onClick={onClickAdd} variant={"outline-dark"}>Добавить в корзину</Button>
          </Card>
        </Col>
        </Row>
        <Row> 
          <Col>
          <h2 className={classes.titleAuth} style={{margin: '2em'}}>Описание:</h2>
            <p className={classes.default_text}>{data.description ? data.description : 'К сожалению, описание отсутствует'}</p>
        </Col>
        </Row>
      </Container>
      </div>
    )
  }
  