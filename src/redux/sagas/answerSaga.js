import { put, call, takeLatest } from 'redux-saga/effects';
import * as answerConstants from '../constants/answerConstants';
import * as assignmentsConstants from '../constants/assignmentsConstants';
import {
  CreateAnswer,
  LoadAnswer,
  DeleteAnswer,
  EditAnswer,
  Approve,
  AnswerInternByMentor,
  Mark,
  AssignInternToAssignment,
} from '../../api/answerApi';

function* onCreateAnswer(action) {
  try {
    const answer_created = yield call(CreateAnswer, action.profile)
    yield put({ type: answerConstants.CREATE_ANSWER_SUCCESS, payload: answer_created })
  } catch (error) {
    console.log(error)
  }
}

function* onLoadAnswer() {
  try {
    const answers = yield call(LoadAnswer)
    answers.sort((a, b) => b.id - a.id)
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

function* onEditAnswer(action) {
  try {
    const message = yield call(EditAnswer, action.profile, action.id_answer)
    yield put({
      type: answerConstants.EDIT_ANSWER_SUCCESS,
      payload: message,
      id_answer: action.id_answer,
      link: action.link,
    })
  } catch (error) {
    console.log(error)
  }
}

function* onApprove(action) {
  try {
    const approve = yield call(Approve, action.id_answer)
    yield put({ type: answerConstants.APPROVE_SUCCESS, payload: approve, id_answer: action.id_answer })
  } catch (error) {
    console.log(error)
  }
}

function* onLoadAnwerInternByMentor(action) {
  try {
    const answer_intern = yield call(AnswerInternByMentor, action.id_intern)
    const answer_intern_null = answer_intern.data.filter(item => item.assignment !== null)
    answer_intern_null.sort((a, b) => b.assignment.id - a.assignment.id)
    // console.log('answer_intern_as', answer_intern.data)
    yield put({ type: answerConstants.ANSWER_INTERN_BY_MENTOR_SUCCESS, payload: answer_intern_null })
  } catch (error) {
    console.log(error)
  }
}

function* onPutMark(action) {
  try {
    const mark = yield call(Mark, action.id_answer, action.profile)
    yield put({
      type: answerConstants.PUT_MARK_SUCCESS,
      payload: mark,
      mark: action.mark,
      evaluate: action.evaluate,
      id_answer: action.id_answer,
    })
  } catch (error) {
    console.log(error)
  }
}

function* onAssignInternToAssignment(action) {
  try {
    yield call(AssignInternToAssignment, action.id_assignment, action.profile)
  } catch (error) {
    console.log(error)
  }
}

export default function* Answer() {
  yield takeLatest(answerConstants.CREATE_ANSWER_REQUEST, onCreateAnswer)
  yield takeLatest(answerConstants.LOAD_ANSWER_REQUEST, onLoadAnswer)
  yield takeLatest(answerConstants.DELETE_ANSWER_REQUEST, onDeteleAnswer)
  yield takeLatest(answerConstants.EDIT_ANSWER_REQUEST, onEditAnswer)
  yield takeLatest(answerConstants.APPROVE_REQUEST, onApprove)
  yield takeLatest(answerConstants.ANSWER_INTERN_BY_MENTOR_REQUEST, onLoadAnwerInternByMentor)
  yield takeLatest(answerConstants.PUT_MARK_REQUEST, onPutMark)
  yield takeLatest(answerConstants.ASSIGN_INTERN_TO_ASSIGNMENT_REQUEST, onAssignInternToAssignment)
}