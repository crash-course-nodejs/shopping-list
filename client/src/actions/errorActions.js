import { GET_ERRORS, CLEAR_ERRORS } from './types';

// 에러 반환: id 는 REGISTER_FAIL 와 같은 특정 에러의 아이디를 나타내기 위함.
export const returnErrors = (msg, status, id = null) => {
  return {
    type: GET_ERRORS,
    payload: { msg, status, id }
  };
};

// 에러 모두 지우기
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};