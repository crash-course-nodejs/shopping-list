import React, { useState } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import {v4 as uuidv4} from 'uuid';
import './ShoppingListStyle.scss';

const initialItems = [
  { id: uuidv4(), name: 'Eggs' },
  { id: uuidv4(), name: 'Milk' },
  { id: uuidv4(), name: 'Steak' },
  { id: uuidv4(), name: 'Water' },
];

const addButtonStyle = {
  marginBottom: '2rem'
};

const ShoppingList = () => {
  const [items, setItems] = useState(initialItems);

  return (
    <Container>
      <Button
        color="dark"
        style={addButtonStyle}
        onClick={() => {
          const name = prompt('상품명 입력');
          name && setItems([...items, {id: uuidv4(), name}]);
        }}
      >
        물품 추가
      </Button>

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
                    onClick={() => {
                      setItems(items.filter(item => item.id !== id));
                    }}
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

export default ShoppingList;