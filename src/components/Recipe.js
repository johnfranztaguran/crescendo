import React, { useState, useEffect } from 'react';
import Request from '../endpoint/request';
import { PageHeader, CRUD } from 'franz-skeleton-design';
import { notification, Spin } from 'antd';
import RecipeContent from './recipeContent';
import SpinStyles from './SpinStyle';
import CrudStyle from './crudStyle';

const foodRequest = new Request();

const Recipe = () => {
  const [recipeItems, setRecipeItems] = useState([]);
  const [isLoaded, dataLoaded] = useState(false);

  useEffect(() => {
    getRequestRecipeItems();
  }, []);

  const getRequestRecipeItems = async () => {
    try {
      const recipeItems = await foodRequest.getRecipeItems();
      setRecipeItems(recipeItems);
      dataLoaded(true);
    } catch (err) {
      console.error('Error', err);
      notification.open({
        message: 'Something went wrong',
        description: `Error while fetching: ${err}`
      });
    }
  }

  const renderListView = () => {
    return (
      <React.Fragment>
        {
          isLoaded ? (
            <RecipeContent recipeItems={recipeItems} />
          ) : (
            <Spin size='large' style={SpinStyles} />
          )
        }
      </React.Fragment>
    );
  };

  const renderHeader = controls => <PageHeader controls={controls}>Recipe</PageHeader>;

  return (
    <CrudStyle>
      <CRUD
        headerView={renderHeader}
        listView={renderListView}
      />
    </CrudStyle>
  );
};

export default Recipe;
