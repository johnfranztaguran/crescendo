import React, { Fragment } from 'react';
import { Collapse, Form, Row, Col, Icon, Tag, Avatar, notification, Spin } from 'antd';
import PropTypes from 'prop-types';
import _get from 'lodash.get';
import RecipeTabs from './recipeTabs';
import HeaderStyle from './styledComponents/collapseHeaderStyle';
import RecipeForm from './recipeForm';
import Request from '../endpoint/request';
import SpinStyles from './SpinStyle';
import EditModalStyle from './modal.style';
import EditFormStyle from './styledComponents/addFormStyle'

const foodRequest = new Request();

const { Panel } = Collapse;

class RecipeContent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activePanel: '',
      foodItems: [],
      isLoaded: false,
      isVisible: false,
      title: '',
      description: '',
      cookTime: '',
      prepTime: '',
      servings: '',
      specificId: undefined,
      specificItem: []
    }
  }

  componentDidMount() {
    this.getRequestRecipeItems();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      JSON.stringify(nextState.recipeItems !== JSON.stringify(this.state.recipeItems))
    )
  };

  editRequestRecipeItems = () => {
    const { title, description, cookTime, prepTime, servings, directions, ingredients, specificId } = this.state;
    try {
      foodRequest.editRecipeItems(title, description, cookTime, prepTime, servings, specificId);
      this.getRequestRecipeItems();
    } catch (err) {
      console.error('Error', err);
      notification.open({
        message: 'Something went wrong',
        description: `Error while fetching: ${err}`
      });
    }
  };

  getRequestRecipeItems = async () => {
    try {
      const foodItems = await foodRequest.getRecipeItems();
      this.setState({
        foodItems,
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

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  editForm = () => {
    const { title, description, cookTime, prepTime, servings, specificItem } = this.state;
    console.log('render edit ***', specificItem);
    return (
      <React.Fragment>
        <EditFormStyle>
          <Form>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item>
                  <div className='input-wrapper'>
                    <input
                      type="text"
                      // value={specificItem.title}
                      value={title}
                      placeholder={`${specificItem.title}`}
                      name='title'
                      className='search-input'
                      onChange={this.handleChange}
                    />
                    <span className='border-style-span'></span>
                  </div>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item>
                  <div className='input-wrapper'>
                    <input
                      type="text"
                      // value={specificItem.description}
                      value={description}
                      placeholder={`${specificItem.description}`}
                      // placeholder="Description"
                      name='description'
                      className='search-input'
                      onChange={this.handleChange}
                    />
                    <span className='border-style-span'></span>
                  </div>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item>
                  <div className='input-wrapper'>
                    <input
                      type="text"
                      // value={specificItem.cookTime}
                      value={cookTime}
                      placeholder={`${specificItem.cookTime}`}
                      // placeholder="Cook Time"
                      name='cookTime'
                      className='search-input'
                      onChange={this.handleChange}
                    />
                    <span className='border-style-span'></span>
                  </div>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item>
                  <div className='input-wrapper'>
                    <input
                      type="text"
                      // value={specificItem.prepTime}
                      value={prepTime}
                      placeholder={`${specificItem.prepTime}`}
                      // placeholder="Preparing Time"
                      name='prepTime'
                      className='search-input'
                      onChange={this.handleChange}
                    />
                    <span className='border-style-span'></span>
                  </div>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item>
                  <div className='input-wrapper'>
                    <input
                      type="text"
                      // value={specificItem.servings}
                      value={servings}
                      placeholder={`${specificItem.servings}`}
                      // placeholder="Servings"
                      name='servings'
                      className='search-input'
                      onChange={this.handleChange}
                    />
                    <span className='border-style-span'></span>
                  </div>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </EditFormStyle>
      </React.Fragment>
    );
  };

  renderCollapseHeader = recipes => {
    return (
      <React.Fragment>
        <Row>
          <Col span={3} lg={4}>
            <h4>{recipes.title}</h4>
            <div className='bottom-header'>
              <a
                onClick={() => {
                  this.setState({ specificId: recipes.uuid, specificItem: recipes })
                  this.handleShowModal();
                }}
                className='icon-setting'
              >
                <Icon type='edit'/>
              </a>
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

  collapseChange = key => {
    this.setState({activePanel: key });
  }

  childPanelAvatar = item => {
    return (
      <div>
        <Avatar size={128} src={_get(item, 'full')} />
      </div>
    );
  };

  renderCollapseContent = items => {
    return (
      <Fragment>
        <RecipeTabs items={items}/>
      </Fragment>
    )
  }

  handleShowModal = () => {
    this.setState({ isVisible: true })
  }

  handleCancel = () => {
    this.setState({ isVisible: false })
  }

  handleOk = () => {
    this.editRequestRecipeItems()
    this.setState({ isVisible: false })
  }

  render() {
    const { isLoaded, foodItems, isVisible } = this.state;
    return (
      <React.Fragment>
        {
          isLoaded ? (
            <HeaderStyle>
              <EditModalStyle
                title='Edit Recipe'
                visible={!!isVisible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
              >
                {this.editForm()}
              </EditModalStyle>
              <RecipeForm getRequestRecipeItems={this.getRequestRecipeItems} />
              <Collapse
                expandIcon={({ isActive }) => <Icon style={{ color: 'gray'}} type="caret-right" rotate={isActive ? 90 : 0} />}
                onChange={this.collapseChange}
                style={{ backgroundColor: '#fcf4e8'}}
                expandIconPosition='right'
                activeKey={this.state.activePanel}
              >
                {
                  foodItems.map(recipes => {
                    return (
                      <Panel
                        className='isoPanel'
                        header={this.renderCollapseHeader(recipes)}
                        key={recipes.uuid}
                      >
                        <Col span={10} lg={4}>
                          {this.childPanelAvatar(recipes.images)}
                        </Col>
                        <Col span={30}>
                          {this.renderCollapseContent(recipes)}
                        </Col>
                      </Panel>
                    )
                  })
                }
              </Collapse>
            </HeaderStyle>
          ) : (
            <Spin size='large' style={SpinStyles} />
          )
        }
        
      </React.Fragment>
    )
  }
}

RecipeContent.propTypes = {
  recipeItems: PropTypes.array
};

export default RecipeContent;
