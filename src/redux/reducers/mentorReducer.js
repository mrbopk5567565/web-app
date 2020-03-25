import * as mentorConstants from '../constants/mentorConstants';
import produce from 'immer';

const initialState = {
  list_interns: {},
}

const mentorReducer =(state = initialState, action) =>
  produce(state, newState => {
    switch (action.type) {
      case mentorConstants.LOAD_INTERNS_SUCCESS:
        newState.list_interns = action.payload;
        break;
      default:
        return newState;
    }
    return newState;
  });

export default mentorReducer;