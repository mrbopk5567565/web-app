import { combineReducers } from 'redux';
import userReducer from './userReducer';
import internReducer from './internReducer';
import mentorReducer from './mentorReducer';
import assignmentReducer from './assignmentReducer';
import commentReducer from './commentReducer';

export default combineReducers({
  user: userReducer,
  intern: internReducer,
  mentor: mentorReducer,
  assignment: assignmentReducer,
  comment: commentReducer,
})