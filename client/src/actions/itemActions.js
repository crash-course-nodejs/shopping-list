/* 서버에 실제로 쏠 요청 */
import axios from 'axios';
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from './types';

export const getItems = () => dispatch => {
  dispatch(setItemsLoading());
  axios
    .get('/api/items') // package.json 에 http://localhost:5000 을 proxy 로 해둠.
    .then(res => 
      dispatch({
        type: GET_ITEMS,
        payload: res.data
      }));
};

export const addItem = item => dispatch => {
  axios
    .post('/api/items', item)
    .then(res => 
      dispatch({
        type: ADD_ITEM,
        payload: res.data
      }));
};

export const deleteItem = id => dispatch => {
  axios
    .delete(`/api/items/${id}`)
    .then(res => 
      dispatch({
        type: DELETE_ITEM,
        payload: id
      }));
};

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  }
};