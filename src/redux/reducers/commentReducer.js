import * as commentConstants from '../constants/commentConstants';
import produce from 'immer';

const initialState = {
  comment_answer: {},
  message: '',
  comments: {},
  loading: false,
}

const commentReducer = (state = initialState, action) =>
  produce(state, newState => {
    switch (action.type) {
      case commentConstants.LOAD_COMMENT_ANSWER_REQUEST:
        newState.loading = true;
        break;
      case commentConstants.LOAD_COMMENT_ANSWER_SUCCESS:
        newState.comment_answer = { ...newState.comment_answer, [action.id_answer]: action.payload.data };
        // newState.comment_answer = action.comments;
        newState.loading = false;
        break;
      case commentConstants.POST_COMMENT_REQUEST:
        newState.loading = true;
        break;
      case commentConstants.POST_COMMENT_SUCCESS:
        newState.loading = false;
        newState.comment_answer[action.payload.answer_id] = [...newState.comment_answer[action.payload.answer_id], action.payload]
        break;
      case commentConstants.DETELE_COMMENT_SUCCESS:
        const comment_answer_new = newState.comment_answer[action.id_answer].filter(item => item.id !== action.payload.comment_id)
        newState.comment_answer = { ...newState.comment_answer, [action.id_answer]: comment_answer_new };
        break;
      case commentConstants.LOAD_ALL_COMMENTS_SUCCESS:
        newState.comments = action.payload;
        break;
      default:
        return newState;
    }
    return newState;
  })

export default commentReducer