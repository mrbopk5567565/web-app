import * as commentConstants from '../constants/commentConstants';
import produce from 'immer';

const initialState = {
  comment_answer: {},
  message: '',
}

const commentReducer = (state = initialState, action) =>
  produce(state, newState => {
    switch (action.type) {
      case commentConstants.LOAD_COMMENT_ANSWER_SUCCESS:
        newState.comment_answer = { ...newState.comment_answer, [action.id_answer]: action.payload };
        break;
      // case commentConstants.POST_COMMENT_SUCCESS:
      //   newState.message = action.payload;
      //   break;
      case commentConstants.DETELE_COMMENT_SUCCESS:
        const comment_answer_new = newState.comment_answer[action.id_answer].filter(item => item.id !== action.payload.comment_id)
        newState.comment_answer = { ...newState.comment_answer, [action.id_answer]: comment_answer_new };
        break;
      default:
        return newState;
    }
    return newState;
  })

export default commentReducer