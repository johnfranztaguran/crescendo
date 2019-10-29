import React, { useState, useEffect } from 'react';
import Request from '../endpoint/request';
import { PageHeader, CRUD } from 'franz-skeleton-design';
import { notification, Spin } from 'antd';
import RecipeContent from './recipeContent';
import SpinStyles from './SpinStyle';
import CrudStyle from './crudStyle';

const foodRequest = new Request();

const Special = () => {
  const [specialItems, setSpecialItems] = useState([]);
  const [isLoaded, dataLoaded] = useState(false);

  useEffect(() => {
    getRequestSpecialItems();
  }, []);

  const getRequestSpecialItems = async () => {
    try {
      const specialItems = await foodRequest.getSpecialItems();
      setSpecialItems(specialItems);
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
        <div>Specials ...</div>
      </React.Fragment>
    );
  };

  const renderHeader = controls => <PageHeader controls={controls}>Specials</PageHeader>;

  console.log('specials ===', specialItems);

  return (
    <CrudStyle>
      <CRUD
        headerView={renderHeader}
        listView={renderListView}
      />
    </CrudStyle>
  );
};

export default Special;
