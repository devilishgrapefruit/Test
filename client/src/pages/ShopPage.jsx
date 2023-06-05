import {Container} from 'react-bootstrap'
import { CategoriesBar } from '../components/CategoriesBar'
import { useDispatch, useSelector } from 'react-redux'
import React from 'react'
import { fetchGames } from '../redux/slices/games'
import { Game } from '../components/Game'
import { Header } from '../components/Header'
import { useParams } from 'react-router-dom'
import classes from '../App.module.css'

export const ShopPage = () => {
  const {categoryid} = useParams()
  const isSorting = Boolean(categoryid)
  const dispatch = useDispatch()
  const {games, categories} = useSelector(state => state.games)
  const userData = useSelector((state) => state.auth.data)
  const isGamesLoading = games.status === 'loading'
  React.useEffect(() => {
  dispatch(fetchGames())
  }, [])


    return (
      <div>
        <Header/>
      <Container className="d-flex justify-content-start">
        <Container style={{width: '20em'}}>
          <h4 className={classes.titleAuth} styles={{margin: '2em'}}>Категории игр</h4>
        <CategoriesBar className="d-flex"/>
        </Container>
        <Container>
        <h4 className={classes.titleAuth} styles={{margin: '1em'}}>Наш ассортимент</h4>
        <div className="d-flex justify-content-around gap-4 flex-wrap mt-4" >
          {(isGamesLoading ? [...Array(4)]: games.items).map((game, index) => 
            isGamesLoading ? (
             <Game classaName="d-flex mt-2" key={index} isLoading={true}/>
            ) : (
              <Game
              key={index}
              id={game._id}
              name={game.name}
              cost={game.cost}
              imageUrl= {game.imageUrl}
              user={game.user}
              createdAt={game.createdAt}
              category={game.category}
              isEditable={userData?._id === game.user._id}
              /> 
            )
            
            )
            }
</div>

</Container>
      </Container>
      </div>
    )
  }


  