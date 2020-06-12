import axios from 'axios';
import { returnErrors } from './errorActions';
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS
} from '../actions/types';

// 가입
export const register = ({ name, email, password }) => dispatch => {
  // Headers
  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  };

  // Request Body
  const body = JSON.stringify({ name, email, password });

  axios.post('/api/users', body, config)
    .then(res => dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    }))
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
      dispatch({
        type: REGISTER_FAIL
      });
    });
};

// 로그인
export const login = ({ email, password }) => dispatch => {
  // Headers
  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  };

  // Request Body
  const body = JSON.stringify({ email, password });

  axios.post('/api/auth', body, config)
    .then(res => dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    }))
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
      dispatch({
        type: LOGIN_FAIL
      });
    });
};

// 로그아웃
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};

// 토큰 검사 & 유저 객체 생성
export const loadUser = () => (dispatch, getState) => {
  // User 로딩
  dispatch({ type: USER_LOADING });

  axios.get('/api/auth/user', tokenConfig(getState))
    .then(res => dispatch({ 
      type: USER_LOADED,
      payload: res.data /* user 데이터 */
     }))
     .catch(err => {
       dispatch(returnErrors(err.response.data, err.response.status));
       dispatch({
         type: AUTH_ERROR
       })
     });
};

export const tokenConfig = getState => {
    // 로컬스토리지에서 토큰 가져오기
    const token = getState().auth.token;

    // Headers
    const config = {
      headers: {
        "Content-type": "application/json"
      }
    };
  
    // 토큰이 있으면 헤더에 추가하기.
    if (token) {
      config.headers['x-auth-token'] = token;
    }

    return config;
};