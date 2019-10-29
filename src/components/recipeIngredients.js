import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Tag, Icon, Card } from 'antd';
import Request from '../endpoint/request';
import IngredientsRelatedModal from './modalTwo.style';

const foodRequest = new Request();

const RecipeIngredients = ({ items }) => {
  const [relatedItem, setRelatedItem] = useState([]);
  const [isVisible, showVisible] = useState(false);

  const actionQueryItems = async id => {
    try {
      const result = await foodRequest.getSpecialRelatedItems(id);
      setRelatedItem(result);
    } catch (err) {
      console.error('Error: ', err);
    };
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <strong>{text}</strong>,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: text => (
        <Tag color='green'>{text}</Tag>
      )
    },
    {
      title: 'Measurement',
      dataIndex: 'measurement',
      key: 'measurement',
      render: text => (
        <Tag color='volcano'>{text}</Tag>
      )
    },
    {
      title: 'Extras',
      render: ({ uuid }) => {
        return (
          <div>
            <Button
              onMouseEnter={() => actionQueryItems(uuid)}
              onClick={() => handleShowModal()}
            >
              <Icon type='coffee' />
            </Button>
          </div>
        )
      }
    }
  ];

  const modalContent = () => {
    return (
      <Fragment>
        {
          relatedItem.length ? (
            relatedItem.map((val,i) => (
              <div key={i} style={{ background: '#ECECEC', padding: '30px' }}>
                <Card title={val.title} bordered={false} style={{ width: 300 }}>
                  <p><strong>Type: </strong>{val.type}</p>
                  <p><strong>Location: </strong>{val.geo}</p>
                  <div dangerouslySetInnerHTML={{ __html: `${val.text}` }} />
                </Card>
              </div>
            ))
          ) : (<p>No Item to Show...</p>)
        }
      </Fragment>
    )
  }

  const handleShowModal = () => {
    showVisible(true);
  }

  const handleCancel = () => {
    showVisible(false);
  }

  const handleOk = () => {
    showVisible(false);
  }

  return (
    <div>
      <IngredientsRelatedModal
        title="Special Ingredients"
        visible={!!isVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {modalContent()}
      </IngredientsRelatedModal>
      <Table rowKey='uuid' columns={columns} dataSource={items} />
    </div>
  );
};

RecipeIngredients.propTypes = {
  items: PropTypes.array.isRequired
};

export default RecipeIngredients;