import * as mentorConstants from '../constants/mentorConstants';
import produce from 'immer';

const initialState = {
  list_interns: {},
  intern_detail: {},
  loading_page: false,
  interns_mentor: [],
}

const mentorReducer = (state = initialState, action) =>
  produce(state, newState => {
    switch (action.type) {
      case mentorConstants.LOAD_INTERNS_REQUEST:
        return {
          ...newState,
          loading_page: true,
        }
      case mentorConstants.LOAD_INTERNS_SUCCESS:
        newState.list_interns = action.data_interns;
        newState.intern_detail = action.payload;
        newState.loading_page = false;
        break;
      case mentorConstants.LOAD_INTERNS_MENTOR_SUCCESS:
        newState.interns_mentor = action.payload;
        break;
      default:
        return newState;
    }
    return newState;
  });

export default mentorReducer;