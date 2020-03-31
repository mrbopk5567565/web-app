import { put, call, takeLatest } from 'redux-saga/effects';
import * as commentConstants from '../constants/commentConstants';
import {
  CommentOfAnswer,
  PostComment,
  DeteleComment
} from '../../api/commentApi'

function* onLoadCommentAnswer(action) {
  try {
    const comment_answer = yield call(CommentOfAnswer, action.id_answer)
    yield put({ type: commentConstants.LOAD_COMMENT_ANSWER_SUCCESS, payload: comment_answer, id_answer: action.id_answer })
  } catch (error) {
    console.log(error)
  }
}

function* onPostCommnet(action) {
  try {
    const message = yield call(PostComment, action.profile)
    // yield put({ type: commentConstants.POST_COMMENT_SUCCESS, payload: message })
  } catch (error) {
    console.log(error)
  }
}

function* onDeteleComment(action) {
  try {
    const comment_id = yield call(DeteleComment, action.id)
    yield put({ type: commentConstants.DETELE_COMMENT_SUCCESS, payload: comment_id, id_answer: action.id_answer })
  } catch (error) {
    console.log(error)
  }
}

export default function* Comment() {
  yield takeLatest(commentConstants.LOAD_COMMENT_ANSWER_REQUEST, onLoadCommentAnswer);
  yield takeLatest(commentConstants.POST_COMMENT_REQUEST, onPostCommnet);
  yield takeLatest(commentConstants.DETELE_COMMENT_REQUEST, onDeteleComment);
}