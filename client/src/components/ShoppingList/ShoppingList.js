import React, { useEffect } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../../actions/itemActions';
import PropTypes from 'prop-types';
import './ShoppingListStyle.scss';

const ShoppingList = ({getItems, deleteItem, item}) => {
  useEffect(() => {
    getItems();
  }, [getItems]);

  const {items} = item;

  return (
    <Container>
      <ListGroup>
        <TransitionGroup className="shopping-list">
          {
            items.map(({ id, name }) => (
              <CSSTransition key={id} timeout={500} classNames="fade">
                <ListGroupItem>
                  <Button
                    className="remove-btn"
                    color="danger"
                    size="sm"
                    onClick={() => deleteItem(id)}
                  >&times;</Button>
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
};

const mapStateToProps = (state) => ({
  item: state.item // state 에는 리듀서들이 들어있는데 거기서 item 리듀서를 선택한다는 뜻.
});

export default connect(mapStateToProps, { getItems, deleteItem })(ShoppingList);