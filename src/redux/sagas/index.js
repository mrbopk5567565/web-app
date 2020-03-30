import { all } from 'redux-saga/effects';
import Login from '../sagas/userSaga';
import Interns from '../sagas/internsSaga';
import Mentor from './mentorSaga';
import Assignment from './assignmentSaga';
import Comment from './commentSaga'

export default function* rootSaga() {
  yield all([
    Login(),
    Interns(),
    Mentor(),
    Assignment(),
    Comment(),
  ])
}