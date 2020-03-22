import { all } from 'redux-saga/effects';
import Login from '../sagas/userSaga'

export default function* rootSaga(){
  yield all([
    Login(),
  ])
}