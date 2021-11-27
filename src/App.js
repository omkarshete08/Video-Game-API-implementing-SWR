import { useEffect, useState } from 'react';
import './App.css';
import useSWR from 'swr';

const fetcher = (...args) => {
return fetch(...args).then((response) => response.json())
}

function App() {

  const [gameTitle, setGameTitle] = useState('')
  const [searchedGames, setSearchedGames] = useState([])

  const {data, error} = useSWR("https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15&pageSize=3", fetcher)

  const searchGame = () => {
    fetch(`https://www.cheapshark.com/api/1.0/games?title=${gameTitle}&limit=3`)
    .then(response => response.json())
    .then(data => {
      setSearchedGames(data)
    })
  }

  return (
    <div className="App">
      <div className="searchSection">
        <h1>Search for a game</h1>
        <input type="text" placeholder="Fifa..." onChange={(event) => {
          setGameTitle(event.target.value)
        }}  ></input>
        <button onClick={searchGame}>Search</button>
        <div className="games">
          {searchedGames.map((game, key) => {
            return (
              <div className="game">
                {game.external}
                <img src={game.thumb} />
                {game.cheapest}
              </div>
            )
          })}
        </div>

      </div>
      <div className="dealsSection">
        <h1>Deals for the day</h1>
        <div className="games">
          {
          data && data.map((game, key) => {
            return (
              <div className="game" id="deals">
                <h3>{game.title}</h3>
                <p> Normal Price: {game.normalPrice}</p>
                <p>Deal Price: {game.salePrice}</p>
                <h3>You save {game.savings.substr(0,2)}%</h3>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
