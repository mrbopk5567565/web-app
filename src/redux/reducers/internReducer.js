import * as internConstants from '../constants/internConstants';
import produce from 'immer';

const initialState = {
  interns: [],
  intern_details: [],
  mentor_details: [],
  pagination: []
}

const internReducer = (state = initialState, action) => 
  produce(state, newState => {
    switch (action.type) {
      case internConstants.LOAD_MENTOR_DETAIL_SUCCESS:
        newState.mentor_details = action.payload;
        break;
      default:
        return newState;
    }
    return newState;
  })

export default internReducer;