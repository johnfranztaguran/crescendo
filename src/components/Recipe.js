import React, { useState, useEffect } from 'react';
import Request from '../endpoint/request';

const foodRequest = new Request();

const Recipe = () => {
  const [recipeItems, setRecipeItems] = useState([]);

  useEffect(() => {
    getRequestRecipeItems();
  }, []);

  const getRequestRecipeItems = async () => {
    try {
      const recipeItems = await foodRequest.getRecipeItems();
      setRecipeItems(recipeItems);
    } catch (err) {
      console.error('Error', err);
    }
  }

  console.log('this is recipe ====', recipeItems);

  return (
    <div>Recipe</div>
  )
}

export default Recipe;
