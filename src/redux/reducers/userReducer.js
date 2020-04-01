import * as userConstants from '../constants/userConstants';
import produce from 'immer'

const initialState = {
  user: {},
  errors: '',
  confirm_email: [],
  mentors: [],
  user_detail: [],
  loggedIn: false,
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
        break;
      case userConstants.UPDATE_USER_DETAIL_SUCCESS:
        newState.user_detail = action.payload;
        break;

      // get name mentors
      case userConstants.LOAD_MENTORS_NAME_SUCCESS:
        newState.mentors = action.payload;

      // post sign up account
      case userConstants.USER_SIGNUP_SUCCESS:
        newState.user = action.payload;
        break;
      case userConstants.USER_SIGNUP_FAILURE:
        newState.errors = action.error;
        break;

      // confirm email for reset password
      case userConstants.CONFIRM_EMAIL_SUCCESS:
        newState.confirm_email = action.payload;
        break;

      // reset password
      case userConstants.RESET_PASSWORD_SUCCESS:
        newState.user = action.payload;
        break;
      default:
        return newState;
    }
    return newState;
  });

export default userReducer;