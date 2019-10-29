import React, { useState, Fragment } from 'react';
import { Collapse, Col, Row, Icon, Tag, Button, Avatar, Tooltip } from 'antd';
import PropTypes from 'prop-types';
import _get from 'lodash.get';
import RecipeTabs from './recipeTabs';
import HeaderStyle from './styledComponents/collapseHeaderStyle';
import RecipeForm from './recipeForm';

const { Panel } = Collapse;

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
        <RecipeForm />
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
