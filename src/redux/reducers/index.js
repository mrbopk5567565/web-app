import { combineReducers } from 'redux';
import userReducer from './userReducer';
import internReducer from './internReducer';
import mentorReducer from './mentorReducer';

export default combineReducers({
  user: userReducer,
  intern: internReducer,
  mentor: mentorReducer,
})