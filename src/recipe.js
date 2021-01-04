import React, { useState } from 'react';

const Recipe = ({title, calories, ingredients, img}) => {
  const [ingredient, setIngredient] = useState(false);

  const showIngredients = () => {
    if (ingredient === false) {
      setIngredient(true)
    } else {
      setIngredient(false)
    }
  }

  return (
    <div className="recipe" >
      { ingredient
        ?
        <p className="ingredients">{ingredients.map(ingredient => ( ingredient.text ))}</p>
        :
        <div className="content">
          <img src={img} alt=""/>
          <h2 className="recipe-title">{title}</h2>
          <p>{calories.toFixed(2)} kcal</p>
        </div>
      }
      
      
      <button className="ingredients-bnt" onClick={showIngredients}>See ingredients</button>
    </div>
  );
}

export default Recipe;