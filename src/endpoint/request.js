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

}

export default YummyFoods;
