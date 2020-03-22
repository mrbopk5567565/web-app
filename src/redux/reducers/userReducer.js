import * as userConstants from '../constants/userConstants';
import produce from 'immer'

const initialState = {
  user: [],
  errors: [],
  mentors: [],
  user_detail: [],
  // loggedIn: false,
}

const userReducer = (state = initialState, action) =>
  produce(state, newState => {
    switch (action.type) {
      case userConstants.USER_LOGIN_SUCCESS:
        newState.user = action.payload;
        newState.loggedIn = true;
        break;
      case userConstants.USER_LOGIN_FAILURE:
        newState.errors = action.messages;
        newState.loggedIn = false;
        break;
      case userConstants.LOGOUT:
        newState.user = [];
        break;
      case userConstants.LOAD_USER_DETAIL_SUCCESS:
        newState.user_detail = action.payload;
      case userConstants.UPDATE_USER_DETAIL_SUCCESS:
        newState.user_detail = action.payload;
      default:
        return newState;
    }
    return newState;
  });

export default userReducer;