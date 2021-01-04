import React, {useEffect, useState} from 'react';
import logo from './logo.png'
import * as ReactBootStrap from "react-bootstrap"
import magnifier from './magnifier.png'
import Recipe from './recipe'
import './App.css';

const App = () => {

  const APP_ID = 'efeb319f';
  const APP_KEY = 'ac63eb35afff6caf46b0f48cb7ef6199';

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState('0');

  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    setLoading(true);
    const data = await response.json();
    setRecipes(data.hits);
    setResults(data.count)
  }


  const updateSearch = e => {
    setSearch(e.target.value);
  }

  const getSearch = e => {
    setLoading(false);
    e.preventDefault();
    setQuery(search)
  }

  return (
    <div className="App">
      <div className="header">
        <img src={logo} alt="logo" className="logo"/>      

        <div className="search">
          <form onSubmit={getSearch}>
            <input type="text" placeholder="Search" className="search-input" value={search} onChange={updateSearch} />
            <input type="image" src={magnifier} alt="magnifier" className="submit-bnt"/>
          </form>
        </div>
      </div>

      {
        results === 0
        ?
        <div className="no-results">
          <p>No results for your search...</p>
        </div>
        :
        <div className="recipes-list">
          {
            loading 
            ?
            recipes.map(recipe => (
              <Recipe 
              key={recipe.recipe.label}
              title={recipe.recipe.label}
              calories={recipe.recipe.calories}
              img={recipe.recipe.image}
              ingredients={recipe.recipe.ingredients}
              />
            ))
            :
            <div>
              <ReactBootStrap.Spinner animation="grow" size="sm" className="small-spinner" />
              <ReactBootStrap.Spinner animation="grow" />
              <ReactBootStrap.Spinner animation="grow" size="sm" className="small-spinner" />
            </div>
          }
        </div>
      }
    </div>
  );
}

export default App;