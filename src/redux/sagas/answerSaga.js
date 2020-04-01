import { put, call, takeLatest } from 'redux-saga/effects';
import * as answerConstants from '../constants/answerConstants';
import * as assignmentsConstants from '../constants/assignmentsConstants';
import {
  CreateAnswer,
  LoadAnswer,
  DeleteAnswer
} from '../../api/answerApi';

function* onCreateAnswer(action) {
  try {
    const answer_created = yield call(CreateAnswer, action.profile)
    yield put({ type: answerConstants.CREATE_ANSWER_SUCCESS, payload: answer_created.answer })
  } catch (error) {
    console.log(error)
  }
}

function* onLoadAnswer() {
  try {
    const answers = yield call(LoadAnswer)
    yield put({ type: answerConstants.LOAD_ANSWER_SUCCESS, payload: answers })
  } catch (error) {
    console.log(error)
  }
}

function* onDeteleAnswer(action) {
  try {
    const message = yield call(DeleteAnswer, action.id_answer)
    yield put({ type: answerConstants.DELETE_ANSWER_SUCCESS, payload: message, id_answer: action.id_answer })
  } catch (error) {
    console.log(error)
  }
}

export default function* Answer() {
  yield takeLatest(answerConstants.CREATE_ANSWER_REQUEST, onCreateAnswer)
  yield takeLatest(answerConstants.LOAD_ANSWER_REQUEST, onLoadAnswer)
  yield takeLatest(answerConstants.DELETE_ANSWER_REQUEST, onDeteleAnswer)
}