import * as commentConstants from '../constants/commentConstants';
import produce from 'immer';

const initialState = {
  comment_answer: [],
  message: '',
}

const commentReducer = (state = initialState, action) =>
  produce(state, newSate => {
    switch (action.type) {
      case commentConstants.LOAD_COMMENT_ANSWER_SUCCESS:
        newSate.comment_answer = action.payload;
        break;
      // case commentConstants.POST_COMMENT_SUCCESS:
      //   newSate.message = action.payload;
      //   break;
      case commentConstants.DETELE_COMMENT_SUCCESS:
        const comment_answer_new = state.comment_answer.filter(item => item.id !== action.payload.comment_id)
        newSate.comment_answer = comment_answer_new;
        break;

      default:
        return newSate;
    }
    return newSate;
  })

export default commentReducer