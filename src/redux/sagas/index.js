import { all } from 'redux-saga/effects';
import Login from '../sagas/userSaga';
import Interns from '../sagas/internsSaga';
import Mentor from './mentorSaga';

export default function* rootSaga(){
  yield all([
    Login(),
    Interns(),
    Mentor(),
  ])
}