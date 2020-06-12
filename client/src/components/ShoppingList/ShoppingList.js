import React, { useEffect } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../../actions/itemActions';
import PropTypes from 'prop-types';
import './ShoppingListStyle.scss';

const ShoppingList = ({getItems, deleteItem, item, isAuthenticated}) => {
  useEffect(() => {
    getItems();
  }, [getItems]);

  const {items} = item;

  return (
    <Container>
      <ListGroup>
        <TransitionGroup className="shopping-list">
          {
            items.map(({ _id, name }) => (
              <CSSTransition key={_id} timeout={500} classNames="fade">
                <ListGroupItem>
                  { 
                    isAuthenticated ? 
                      <Button
                        className="remove-btn"
                        color="danger"
                        size="sm"
                        onClick={() => deleteItem(_id)}
                      >
                        &times;
                      </Button>
                      :
                      null
                  }
                  { name }
                </ListGroupItem>
              </CSSTransition>
            ))
          }
        </TransitionGroup>
      </ListGroup>
    </Container>
  );
};

ShoppingList.propTypes = {
  getItems: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  item: state.item, // state 에는 리듀서들이 들어있는데 거기서 item 리듀서를 선택한다는 뜻.
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { getItems, deleteItem })(ShoppingList);