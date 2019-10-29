import React, { useState, useEffect } from 'react';
import Request from '../endpoint/request';
import { PageHeader, CRUD } from 'franz-skeleton-design';
import { notification, Spin } from 'antd';
import RecipeContent from './recipeContent';
import SpinStyles from './SpinStyle';
import CrudStyle from './crudStyle';

const foodRequest = new Request();

class Recipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipeItems: [],
      isLoaded: false
    }
  }

  componentDidMount() {
    this.getRequestRecipeItems();
  }

  componentWillUpdate(prev, next) {
    console.log('prev ====', prev);
    console.log('next ====', next);
    if(this.state.recipeItems.length === next.recipeItems.length) {
      this.getRequestRecipeItems();
    }
  }

  getRequestRecipeItems = async () => {
    try {
      const recipeItems = await foodRequest.getRecipeItems();
      this.setState({
        recipeItems,
        isLoaded: true
      });
    } catch (err) {
      console.error('Error', err);
      notification.open({
        message: 'Something went wrong',
        description: `Error while fetching: ${err}`
      });
    }
  }

  renderListView = () => {
    const { recipeItems, isLoaded } = this.state;
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

  renderHeader = () => <PageHeader>Recipe</PageHeader>;

  render() {
    const { recipeItems } = this.state;
    console.log(recipeItems);
    return (
      <CrudStyle>
        <CRUD
          headerView={this.renderHeader}
          listView={this.renderListView}
        />
      </CrudStyle>
    );
  };
};

export default Recipe;
