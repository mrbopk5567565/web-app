import * as answerConstants from '../constants/answerConstants';
import produce from 'immer';

const initialState = {
  answer_created: {},
  answers: [],
  message: '',
  approve: {},
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
      // case answerConstants.APPROVE_SUCCESS:
      //   newState.approve = action.payload;
      //   break;
      default:
        return newState;
    }
    return newState;
  })

export default answerReducer;