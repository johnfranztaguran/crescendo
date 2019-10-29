import React from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';
import RecipeDirections from './recipeDirections';
import RecipeIngredients from './recipeIngredients';

const { TabPane } = Tabs;

const RecipeTabs = ({ items }) => {
  return (
    <Tabs tabPosition='left' defaultActiveKey='1'>
      <TabPane tab="Directions" key="1">
        <RecipeDirections items={items.directions} />
      </TabPane>
      <TabPane tab="Ingredients" key="2">
        <RecipeIngredients items={items.ingredients} />
      </TabPane>
    </Tabs>
  )
}

RecipeTabs.propTypes = {
  items: PropTypes.object.isRequired
};

export default RecipeTabs;
