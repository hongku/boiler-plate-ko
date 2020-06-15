import axios from 'axios';
import * as ActionTypes from './types';

export function loginUser (dataToSubmit) {
  const response  = axios.post('/api/users/login', dataToSubmit).then(response => response.data);

  return {
    type: ActionTypes.LOGIN_USER,
    payload: response
  }
};
