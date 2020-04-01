import * as answerConstants from '../constants/answerConstants';
import produce from 'immer';

const initialState = {
  answer_created: {},
  answers: [],
  massage: '',
}

const answerReducer = (state = initialState, action) =>
  produce(state, newState => {
    switch (action.type) {
      case answerConstants.CREATE_ANSWER_SUCCESS:
        newState.answer_created = action.payload;
        newState.answers = [...newState.answers, action.payload]
        break;
      case answerConstants.LOAD_ANSWER_SUCCESS:
        newState.answers = action.payload;
        break;
      case answerConstants.DELETE_ANSWER_SUCCESS:
        newState.massage = action.payload;
        const answers_new = newState.answers.filter(item => item.id !== action.id_answer);
        newState.answers = answers_new;
        break;
      default:
        return newState;
    }
    return newState;
  })

export default answerReducer;