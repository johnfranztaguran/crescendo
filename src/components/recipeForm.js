import React from 'react';
import { Icon, Button, Tooltip, Drawer, Form, Row, Col, Input, notification } from 'antd';
import AddFormStyle from './styledComponents/addFormStyle'
import Request from '../endpoint/request';
import FormModalStyle from './modalTwo.style';
import uuid from 'uuid/v1';

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
      ingredients: [],
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
    const { title, description, cookTime, prepTime, servings, directions, ingredients } = this.state;
    try {
      foodRequest.addRecipeItems(title, description, cookTime, prepTime, servings, directions, ingredients);
      this.props.getRequestRecipeItems();
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
    const { title, description, cookTime, prepTime, servings } = this.state;
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
                      this.handleShowModal();
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

  handleAddIngredientInputs = () => {
    this.setState(prevState => ({
      ingredients: [...prevState.ingredients, { uuid: uuid(), amount: '', measurement: '', name: '' }]
    }))
  };

  handleAddDirectionInputs = () => {
    this.setState(prevState => ({
      directions: [...prevState.directions, { instructions: '' }]
    }))
  };

  handleRemoveDirectionInputs = idx => {
    this.setState({
      directions: this.state.directions.filter((s, sidx) => idx !== sidx)
    });
  };

  handleRemoveIngredientsInputs = idx => {
    this.setState({
      ingredients: this.state.ingredients.filter((s, sidx) => idx !== sidx)
    });
  };

  handleDirectionOnChange = idx => evt => {
    const newDirections = this.state.directions.map((dir, sidx) => {
      if (idx !== sidx) return dir;
      return { ...dir, instructions: evt.target.value };
    });
    this.setState({ directions: newDirections });
  };

  handleIngredientsOnChange = (e) => {
    if (['name', 'amount', 'measurement'].includes(e.target.className)) {
      let ingredients = [...this.state.ingredients]
      ingredients[e.target.dataset.id][e.target.className] = e.target.value
      this.setState({ ingredients }, () => console.log(this.state.ingredients))
    } else {
      this.setState({ [e.target.name]: e.target.value })
    }
  }

  addIngredientsForm = () => {
    const { ingredients } = this.state;
    return (
      <div>
        <form onChange={this.handleIngredientsOnChange}>
          {
            ingredients.map((ing, idx) => {
              let nameId = `name-${idx}`, amountId = `amount-${idx}`, measurementId = `measurement-${idx}`
              return (
                <div key={idx}>
                  <input
                    placeholder="Name"
                    type='text'
                    id={nameId}
                    data-id={idx}
                    value={ingredients[idx].name}
                    className='name'
                  />
                  <input
                    placeholder="Amount"
                    type='text'
                    id={amountId}
                    data-id={idx}
                    value={ingredients[idx].amount}
                    className='amount'
                  />
                  <input
                    placeholder="Measurement"
                    type='text'
                    id={measurementId}
                    data-id={idx}
                    value={ingredients[idx].measurement}
                    className='measurement'
                  />
                  <Icon onClick={() => this.handleRemoveIngredientsInputs(idx)} type='minus-circle' />
                </div>
              )
            })
          }
        </form>
        <Icon type='plus-circle' onClick={() => this.handleAddIngredientInputs()} />
      </div>
    )
  }

  addDirectionsForm = () => {
    return (
      <div>
        {
          this.state.directions.map((dir, idx) => (
            <div key={idx}>
              <Input
                placeholder="input"
                type='text'
                value={dir.instructions}
                onChange={this.handleDirectionOnChange(idx)}
              />
              <Icon onClick={() => this.handleRemoveDirectionInputs(idx)} type='minus-circle' />
            </div>
          ))
        }
        <Icon type='plus-circle' onClick={() => this.handleAddDirectionInputs()} />
      </div>
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
    const { isDrawer, isVisible, shouldOpenModal, directions, ingredients } = this.state;
    return (
      <React.Fragment>
        <FormModalStyle
          title={`Add ${shouldOpenModal}`}
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