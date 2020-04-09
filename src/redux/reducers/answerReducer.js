import * as answerConstants from '../constants/answerConstants';
import produce from 'immer';

const initialState = {
  answer_created: {},
  answers: [],
  message: '',
  approve: {},
  answer_intern: {}
}

const answerReducer = (state = initialState, action) =>
  produce(state, newState => {
    switch (action.type) {
      case answerConstants.CREATE_ANSWER_SUCCESS:
        newState.answer_created = action.payload;
        // newState.answers = [...newState.answers, action.payload]
        newState.answers = [action.payload, ...newState.answers]
        break;
      case answerConstants.LOAD_ANSWER_SUCCESS:
        newState.answers = action.payload;
        break;
      case answerConstants.DELETE_ANSWER_SUCCESS:
        newState.message = action.payload;
        const answers_new = newState.answers.filter(item => item.id !== action.id_answer);
        newState.answers = answers_new;
        if (newState.answer_intern.data !== undefined) {
          const answer_intern_delete = newState.answer_intern.data.filter(item => item.id !== action.id_answer)
          newState.answer_intern.data = answer_intern_delete;
        }
        break;
      case answerConstants.EDIT_ANSWER_SUCCESS:
        newState.message = action.payload;
        const answers_new_edit = newState.answers.map(item => {
          if (item.id === action.id_answer) {
            item.link = action.link;
          }
          return item;
        })
        newState.answers = answers_new_edit;
        break;
      case answerConstants.APPROVE_SUCCESS:
        const answer_intern_approve = newState.answer_intern.data.map(item => {
          if (item.id === action.id_answer) {
            item = action.payload;
          }
          return item;
        })
        newState.answer_intern.data = answer_intern_approve
        break;
      case answerConstants.ANSWER_INTERN_BY_MENTOR_SUCCESS:
        newState.answer_intern.data = action.payload;
        break;
      case answerConstants.PUT_MARK_SUCCESS:
        // newState.message = action.payload.message;
        if (action.mark !== undefined) {
          const answer_intern_new_put = newState.answer_intern.data.map(item => {
            if (item.id === action.id_answer) {
              item.mark = action.mark;
            }
            return item
          })
          newState.answer_intern.data = answer_intern_new_put;
        }
        if (action.evaluate !== undefined) {
          const answer_intern_new_put = newState.answer_intern.data.map(item => {
            if (item.id === action.id_answer) {
              item.evaluate = action.evaluate;
            }
            return item
          })
          newState.answer_intern.data = answer_intern_new_put;
        }
        break;
      default:
        return newState;
    }
    return newState;
  })

export default answerReducer;