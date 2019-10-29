import React from 'react';
import { Icon, Button, Tooltip, Drawer, Form, Row, Col, notification } from 'antd';
import AddFormStyle from './styledComponents/addFormStyle'
import Request from '../endpoint/request';
import FormModalStyle from './modalTwo.style';

const foodRequest = new Request();

const SHOW_INGREDIENTS = 'INGREDIENTS'
const SHOW_DIRECTIONS = 'DIRECTIONS'

class RecipeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDrawer: false,
      title: '',
      description: '',
      cookTime: '',
      prepTime: '',
      servings: '',
      directions: [],
      directionsText: '',
      ingredients: [],
      ingredientsText: '',
      isVisible: false,
      shouldOpenModal: SHOW_DIRECTIONS
    }
  }

  showDrawerModal = () => {
    this.setState({ isDrawer: true });
  }
  onClose = () => {
    this.setState({
      isDrawer: false,
    });
  };

  addRequestRecipeItems = () => {
    const { title, description, cookTime, prepTime, servings } = this.state;
    try {
      foodRequest.addRecipeItems(title, description, cookTime, prepTime, servings);
    } catch (err) {
      console.error('Error', err);
      notification.open({
        message: 'Something went wrong',
        description: `Error while fetching: ${err}`
      });
    }
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  addForm = () => {
    const { title, description, cookTime, prepTime, servings, directions, ingredients } = this.state;
    return (
      <React.Fragment>
        <AddFormStyle>
          <Form>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item>
                  <div className='input-wrapper'>
                    <input
                      type="text"
                      value={title}
                      placeholder="Title"
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
                      value={description}
                      placeholder="Description"
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
                      value={cookTime}
                      placeholder="Cook Time"
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
                      value={prepTime}
                      placeholder="Preparing Time"
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
                      value={servings}
                      placeholder="Servings"
                      name='servings'
                      className='search-input'
                      onChange={this.handleChange}
                    />
                    <span className='border-style-span'></span>
                  </div>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <div>
                  <Button
                    onClick={() => {
                      this.setState({ shouldOpenModal: SHOW_DIRECTIONS });
                      this.handleShowModal();
                    }}
                  >
                    <Icon type='plus-circle' />
                  </Button>
                  <p>Add Directions</p>
                </div>
              </Col>
              <Col span={12}>
                <div>
                  <Button
                    onClick={() => {
                      this.setState({ shouldOpenModal: SHOW_INGREDIENTS });
                      this.handleShowModal()
                    }}>
                    <Icon type='plus-circle' />
                  </Button>
                  <p>Add Ingredients</p>
                </div>
              </Col>
            </Row>
          </Form>
        </AddFormStyle>
      </React.Fragment>
    );
  };

  addingDataItems = () => {
    let items = {};
  }

  addIngredientsForm = () => {
    return (
      <div>Ingredients</div>
    )
  }

  addDirectionsForm = () => {
    return (
      <div>Directions</div>
    )
  }

  handleShowModal = () => {
    this.setState({ isVisible: true })
  }

  handleCancel = () => {
    this.setState({ isVisible: false })
  }

  handleOk = () => {
    this.setState({ isVisible: false })
  }
  
  flushData = () => {
    this.setState({
      title: '',
      description: '',
      cookTime: '',
      prepTime: '',
      servings: '',
      directions: [],
      ingredients: []
    })
  }

  render() {
    const { isDrawer, isVisible, shouldOpenModal } = this.state;
    return (
      <React.Fragment>
        <FormModalStyle
          title="Add Ingredients"
          visible={!!isVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          {
            shouldOpenModal === SHOW_DIRECTIONS ? (
              this.addDirectionsForm()
            ) : (
              this.addIngredientsForm()
            )
          }
        </FormModalStyle>
        <Drawer
          title="Add Food Recipe's"
          width={700}
          onClose={this.onClose}
          visible={isDrawer}
          placement='right'
        >
          <div>
            {this.addForm()}
            <div
            style={{
              position: 'absolute',
              left: 0,
              bottom: 0,
              width: '100%',
              borderTop: '1px solid #e9e9e9',
              padding: '10px 16px',
              background: '#fff',
              textAlign: 'right',
            }}
          >
            <Button onClick={this.onClose} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button onClick={() => {
              this.addRequestRecipeItems();
              this.flushData();
              this.onClose();
            }} type="primary">
              Add
            </Button>
          </div>
          </div>
        </Drawer>
        <div className='add-food-btn'>
          <Tooltip placement="right" title='Add Food Item'>
            <Button onClick={this.showDrawerModal} >
              <Icon type='plus-circle' />
            </Button>
          </Tooltip>
        </div>
      </React.Fragment>
     );
  }
}
 
export default RecipeForm;