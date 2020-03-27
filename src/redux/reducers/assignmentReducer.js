import * as assignmentsConstants from '../constants/assignmentsConstants';
import produce from 'immer';

const initialState = {
  assignments: {},
  status: [],
}

const assignmentReducer = (state = initialState, action) =>
  produce(state, newState => {
    switch (action.type) {
      case assignmentsConstants.CREATE_ASSIGNMENT_SUCCESS:
        newState.status = action.payload;
        break;
      case assignmentsConstants.LOAD_ASSIGNMENTS_SUCCESS:
        newState.assignments = action.payload;
        break;
      default:
        return newState;
    }
    return newState;
  })

export default assignmentReducer;