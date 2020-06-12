import React from 'react';
import { NavLink } from 'reactstrap';
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';
import PropTypes from 'prop-types';

const Logout = ({logout}) => {
  return (
    <>
      <NavLink onClick={logout} href="#">
        로그아웃
      </NavLink>
    </>
  );
};

Logout.propTypes = {
  logout: PropTypes.func.isRequired
};

export default connect(null, {logout})(Logout);