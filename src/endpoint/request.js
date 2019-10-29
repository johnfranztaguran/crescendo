import axios from 'axios';

class YummyFoods {

  getRecipeItems = async () => {
    try {
      const result = await axios.get(`recipes`);
      return result.data;
    } catch (err) {
      console.log('Error: ', err);
    }
  };

  addRecipeItems = async (title, description, cookTime, prepTime, servings, directions, ingredients) => {
    try {
      const result = await axios.post(`recipes`, {
        title, description, cookTime, prepTime, servings, postDate: Date.now(), directions, ingredients
      });
      return result.data;
    } catch (err) {
      console.log('Error: ', err);
    }
  };

  addRecipeItems = async (title, description, cookTime, prepTime, servings, id) => {
    try {
      const result = await axios.patch(`recipes?uuid=${id}`, {
        title, description, cookTime, prepTime, servings, postDate: Date.now()
      });
      return result.data;
    } catch (err) {
      console.log('Error: ', err);
    }
  };

  getSpecialItems = async () => {
    try {
      const result = await axios.get(`specials`);
      return result.data;
    } catch (err) {
      console.log('Error: ', err);
    }
  };

  getSpecialRelatedItems = async id => {
    try {
      const result = await axios.get(`specials?ingredientId=${id}`);
      return result.data;
    } catch (err) {
      console.log('Error: ', err);
    }
  };

}

export default YummyFoods;
