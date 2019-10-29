import React, { useState, Fragment } from 'react';
import { Collapse, Col, Row, Icon, Tag, Layout, Empty, Avatar } from 'antd';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import _get from 'lodash.get';
import RecipeTabs from './recipeTabs';

const { Panel } = Collapse;
const { Content } = Layout;

const HeaderStyle = styled.div`
  h4 {
    color: #2195F3;
    font-weight: 700;
    font-size: 12px;
    margin-bottom: 6px;
  }

  h1 {
    font-size: 11px;
  }

  .icon-setting {
    margin-right: 15px;
  }

  .isoCustomCollapse {
    &:hover {
      background-color: #deedfa;
    }
  }

  .pagination{
    justify-content: center;
    margin-top: 10px;
  }

  .isoPanel {
    &:hover {
      background-color: #faebd7
    }
  }

  .child-header {
    margin-top: 10px;
  }
  
  .ant-empty-image {
    margin-bottom: 0px;
  }

  li {
    &:focus {
      border-color: blue;
    }
  }
`;

const RecipeContent = ({ recipeItems }) => {

  const [activePanel, setActivePanel] = useState('');

  const renderCollapseHeader = recipes => {
    return (
      <React.Fragment>
        <Row>
          <Col span={3} lg={4}>
            <h4>{recipes.title}</h4>
            <div className='bottom-header'>
              <Tag color="#4CAF50">Cooking Time: {recipes.cookTime}</Tag>
            </div>
          </Col>
          <Col span={4}>
            <p><b>Preparing Time: </b>{recipes.prepTime}</p>
          </Col>
          <Col span={4}>
            <p><b>Servings #: </b>{recipes.servings}</p>
          </Col>
          <Col span={10}>
          <span>Description: <h4> {recipes.description}</h4></span>
          </Col>
        </Row>
      </React.Fragment>
    );
  };

  const collapseChange = key => {
    setActivePanel(key);
  }

  const childPanelAvatar = item => {
    return (
      <div>
        <Avatar size={128} src={_get(item, 'full')} />
      </div>
    );
  };

  const renderCollapseContent = items => {
    return (
      <Fragment>
        <RecipeTabs items={items}/>
      </Fragment>
    )
  }

  return (
    <React.Fragment>
      <HeaderStyle>
        <Collapse
          expandIcon={({ isActive }) => <Icon style={{ color: 'gray'}} type="caret-right" rotate={isActive ? 90 : 0} />}
          onChange={collapseChange}
          style={{ backgroundColor: '#fcf4e8'}}
          expandIconPosition='right'
          activeKey={activePanel}
        >
          {
            recipeItems.map(recipes => {
              return (
                <Panel
                  className='isoPanel'
                  header={renderCollapseHeader(recipes)}
                  key={recipes.uuid}
                >
                  <Col span={10} lg={4}>
                    {childPanelAvatar(recipes.images)}
                  </Col>
                  <Col span={30}>
                    {renderCollapseContent(recipes)}
                  </Col>
                </Panel>
              )
            })
          }
        </Collapse>
      </HeaderStyle>
    </React.Fragment>
  )
}

RecipeContent.propTypes = {
  recipeItems: PropTypes.array.isRequired
};

export default RecipeContent;
