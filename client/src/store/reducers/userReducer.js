import * as ActionTypes from '../actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case ActionTypes.LOGIN_USER:
      return { ...state, loginSuccess: action.payload };
    default:
      return state;
  }
}