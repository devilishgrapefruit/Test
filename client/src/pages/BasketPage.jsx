import React from 'react';
import { Header } from '../components/Header';
import { ManageGame } from '../components/modals/ManageGame';
import classes from '../App.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrder } from '../redux/slices/basket';
import { useParams } from 'react-router-dom';
import host from '../axios';
import { OrderItem } from '../components/OrderItem'
import { NotFoundPage } from './NotFoundPage'
import { Card, Button } from 'react-bootstrap'


export const BasketPage = () => {
  const [data, setData] = React.useState()
  const [isLoading, setLoading] = React.useState(true)
  const {items, totalCost} = useSelector((state) => state.basket)

  React.useEffect(() => {
    host.get('/basket').then(res => {
      setData(res.data)
      setLoading(false)
    }) .catch((err) => {
      console.warn(err)
      alert('Ошибка при получении товаров')
    })
  }, [])

  const onClickSubmit = () => {

  }


    return (
      <div>
        <Header/>
        <div className="d-flex justify-content-around" >
      <div className="d-flex flex-column">
        {(isLoading ? [...Array(5)]: data[0].items).map((game, index) => 
            isLoading ? (
             <NotFoundPage isLoading={true}/>
            ) : (
              <OrderItem
              key={index}
              id={game._id}
              name={game.name}
              cost={game.cost}
              imageUrl= {game.imageUrl}
              /> 
            )
            
            )
            }
        </div>
        {!isLoading &&
        <div className="d-flex flex-column justify-content-between">

          <div className="d-flex justify-content-center">
        <Card className="d-flex align-items-center justify-content-around"
          style={{width: 300, height: 300, fontSize: 32, border: '5px solid lightgray'}}>
            <h3>Итоговая сумма заказа:</h3>
            <h3>{data[0].totalCost} руб.</h3>
            <Button size="lg" variant="success" onClick={onClickSubmit} >Заказать</Button>
          </Card>
          </div>
          </div>
}
        </div>
        </div>
    )
  }
  