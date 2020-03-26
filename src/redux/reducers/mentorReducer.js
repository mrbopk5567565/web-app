import * as mentorConstants from '../constants/mentorConstants';
import produce from 'immer';

const initialState = {
  list_interns: {},
  loading_page: false,
}

const mentorReducer =(state = initialState, action) =>
  produce(state, newState => {
    switch (action.type) {
      case mentorConstants.LOAD_INTERNS_REQUEST:
        return {
          ...newState,
          loading_page: true,
        }
      case mentorConstants.LOAD_INTERNS_SUCCESS:
        newState.list_interns = action.payload;
        newState.loading_page = false;
        break;
      default:
        return newState;
    }
    return newState;
  });

export default mentorReducer;