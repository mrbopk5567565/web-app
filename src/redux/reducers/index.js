import { combineReducers } from 'redux';
import userReducer from './userReducer';
import internReducer from './internReducer'

export default combineReducers({
  user: userReducer,
  intern: internReducer,
})