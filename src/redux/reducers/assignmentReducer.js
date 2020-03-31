import * as assignmentsConstants from '../constants/assignmentsConstants';
import produce from 'immer';

const initialState = {
  assignments: {},
  status: {},
  id_assignment: {},
  answers_assignment: [],
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
      case assignmentsConstants.EDIT_ASSIGNMENTS_SUCCESS:
        newState.status = action.payload;
        const assignments_new_edit = state.assignments.data.map((item) => {
          if (item.id === action.data_id_assignment.id) {
            item = action.data_id_assignment;
          }
          return item;
        })
        newState.assignments.data = assignments_new_edit;
        break;
      case assignmentsConstants.DELETE_ASSIGNMENT_SUCCESS:
        newState.status = action.payload;
        const assignments_new_detele = state.assignments.data.filter(item => item.id !== action.data_id_assignment.id)
        newState.assignments.data = assignments_new_detele;
        break;
      case assignmentsConstants.LOAD_ANSWERS_ASSIGNMENT_SUCCESS:
        newState.answers_assignment = action.answer;
        break;
      default:
        return newState;
    }
    return newState;
  })

export default assignmentReducer;