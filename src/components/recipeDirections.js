import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'antd';

const RecipeDirections = ({ items }) => {
  return (
    <div>
      <h3 style={{ marginBottom: 16 }}>Directions</h3>
      <List
        bordered
        dataSource={items}
        renderItem={(item, index) => (
          <List.Item>
            <span>{index + 1}. </span>{item.instructions}
          </List.Item>
        )}
      />
    </div>
  );
};

RecipeDirections.propTypes = {
  items: PropTypes.array
};

export default RecipeDirections;
