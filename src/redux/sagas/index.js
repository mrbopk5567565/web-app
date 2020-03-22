import { all } from 'redux-saga/effects';
import Login from '../sagas/userSaga';
import Interns from '../sagas/internsSaga'

export default function* rootSaga(){
  yield all([
    Login(),
    Interns(),
  ])
}