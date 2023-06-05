import React from 'react';
import { Header } from '../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrder } from '../redux/slices/basket';
import { OrderItem } from '../components/OrderItem'
import { NotFoundPage } from './NotFoundPage'
import { Card, Button } from 'react-bootstrap'


export const BasketPage = () => {
  const {basket} = useSelector((state) => state.basket)
  const isLoading = basket.status === 'loading'
const dispatch = useDispatch()
  React.useEffect(() => {
    dispatch(fetchOrder())
    }, [])

  const onClickSubmit = () => {

  }


    return (
      <div>
        <Header/>
        <div className="d-flex justify-content-around" >
      <div className="d-flex flex-column">
         {isLoading ? <NotFoundPage isLoading={true}/> : basket.items.map((pos) => 
         pos.items.map((game, index) => 
         <OrderItem key={index}
         id = {game._id}
         name={game.name}
         cost={game.cost}
         imageUrl={game.imageUrl}
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
            <h3>{isLoading ? 0 : basket.totalCost} руб.</h3>
            <Button size="lg" variant="success" onClick={onClickSubmit} >Заказать</Button>
          </Card>
          </div>
          </div>
}
        </div>
        </div>
    )
  }
  