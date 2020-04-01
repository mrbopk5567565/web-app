import { put, call, takeLatest } from 'redux-saga/effects';
import * as commentConstants from '../constants/commentConstants';
import {
  CommentOfAnswer,
  PostComment,
  DeteleComment,
  LoadAllComments
} from '../../api/commentApi'

function* onLoadCommentAnswer(action) {

  try {
    const comment_answer = yield call(CommentOfAnswer, action.id_answer)
    yield put({ type: commentConstants.LOAD_COMMENT_ANSWER_SUCCESS, payload: comment_answer, id_answer: action.id_answer })

    // const all_comments = yield call(LoadAllComments)
    // const id_answers = all_comments.map(item => item.answer_id)
    // const comment = {}
    // for (let id of id_answers) {
    //   const comment_answer = yield call(CommentOfAnswer, id)
    //   comment[id] = comment_answer
    // }
    // yield put({ type: commentConstants.LOAD_COMMENT_ANSWER_SUCCESS, payload: comment })
  } catch (error) {
    console.log(error)
  }
}

function* onPostCommnet(action) {
  try {
    const post_comment = yield call(PostComment, action.profile)
    console.log('post comment', post_comment)
    yield put({ type: commentConstants.POST_COMMENT_SUCCESS, payload: post_comment })
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