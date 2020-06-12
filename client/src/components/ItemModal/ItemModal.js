import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label, 
  Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { addItem } from '../../actions/itemActions';
import PropTypes from 'prop-types';

const ItemModal = ({addItem, isAuthenticated}) => {
  const [modal, setModal] = useState(false);
  const [name, setName] = useState('');

  const toggle = () => setModal(!modal);
  const onChange = e => {
    setName(e.target.value);
  };
  const onSubmit = e => {
    e.preventDefault();

    const newItem = {
      name
    };

    // 상품 상태 추가
    addItem(newItem);

    // 모달창 닫기
    toggle();
  };

  return (
    <div>
      { 
        isAuthenticated ? 
          <Button
            color="dark"
            style={{marginBottom: '2rem'}}
            onClick={toggle}
          >
            상품 추가
          </Button>
          :
          <h4 className="mb-3">로그인 후 상품을 등록할 수 있습니다.</h4>
      }
      

      <Modal
        isOpen={modal}
        toggle={toggle}
      >
        <ModalHeader toggle={toggle}>상품명을 등록해주세요.</ModalHeader>
        
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="item">상품명</Label>
              <Input 
                type="text"
                name="name"
                id="item"
                placeholder="상품명 입력"
                onChange={onChange}
              >
              </Input>
              <Button
                color="dark"
                style={{marginTop: '2rem'}}
                block
              >추가</Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  )
};

ItemModal.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {addItem})(ItemModal);