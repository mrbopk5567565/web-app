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
        newState.assignments.data = [action.create_assignment, ...newState.assignments.data];
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

      // API bên answer
      case assignmentsConstants.DELETE_ANSWER_MENTOR_SUCCESS:
        const answers_assignment_new = newState.answers_assignment[action.id_assignment].filter(item => item.id !== action.id_answer)
        newState.answers_assignment = { ...newState.answers_assignment, [action.id_assignment]: answers_assignment_new };
        break;
      case assignmentsConstants.APPROVE_BY_MENTOR_SUCCESS:
        const answers_assignment_approve = newState.answers_assignment[action.assignment_id].map(item => {
          if (item.id === action.id_answer) {
            item = action.payload;
          }
          return item;
        })
        newState.answers_assignment = { ...newState.answers_assignment, [action.assignment_id]: answers_assignment_approve };
        break;
      default:
        return newState;
    }
    return newState;
  })

export default assignmentReducer;