import React, { useState, useEffect } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label, 
  Input,
  NavLink,
  Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

const LoginModal = ({login, error, clearErrors, isAuthenticated}) => {
  const [modal, setModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState(null);
  
  useEffect(() => {
    if (error.id === 'LOGIN_FAIL') {
      setMsg(error.msg.msg);
    } else {
      setMsg(null);
    }
  }, [error]);

  useEffect(() => {
    // 회원가입 성공하면 모달창 닫기
    if (modal) {
      if (isAuthenticated) {
        toggle();
      }
    }
  }, [modal, isAuthenticated]);

  const toggle = () => {
    clearErrors();
    setModal(!modal);
  };
  
  const onSubmit = e => {
    e.preventDefault();

    const user = {
      email,
      password
    };

    login(user);
  };

  return (
    <>
      <NavLink onClick={toggle} href="#">
        로그인
      </NavLink>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>로그인</ModalHeader>
        <ModalBody>
          { 
            msg ? <Alert color="danger">{ msg }</Alert> : null 
          }
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input 
                type="email"
                name="email"
                id="email"
                placeholder="Email 입력"
                className="mb-3"
                onChange={(e) => setEmail(e.target.value)}
              >
              </Input>

              <Label for="password">비밀번호</Label>
              <Input 
                type="password"
                name="password"
                id="password"
                placeholder="비밀번호 입력"
                className="mb-3"
                onChange={(e) => setPassword(e.target.value)}
              >
              </Input>
              <Button color="dark" style={{marginTop: '2rem'}} block >
                로그인
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </>
  )
};

LoginModal.propTypes = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(mapStateToProps, {login, clearErrors})(LoginModal);