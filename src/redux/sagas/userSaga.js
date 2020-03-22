import { put, takeLatest, call, cps } from 'redux-saga/effects';
import * as userConstants from '../constants/userConstants';
import { UserApiLogin, UserApiLoadUserDetail, UserApiUpdateUserDetail } from '../../api/userApi';

function* onLogin(action) {
  try {
    const user = yield call(UserApiLogin, action.user)
    if (user.status === 'error'){
      yield put({ type: userConstants.USER_LOGIN_FAILURE, messages: user.message })
    } else {
      yield put({ type: userConstants.USER_LOGIN_SUCCESS, payload: user })
      yield put({ type: userConstants.USER_LOGIN_FAILURE, messages: '' })
      user.user.role === 'intern' ? action.props.history.push("/intern-home/discuss") : console.log('eaeasd');
    }
  } catch (error) {
    yield put({ type: userConstants.USER_LOGIN_FAILURE, error })
  }
}

function* onLoadUserDetails() {
  try {
    const user_detail = yield call(UserApiLoadUserDetail)
    // console.log('user_detail', user_detail)
    yield put({ type: userConstants.LOAD_USER_DETAIL_SUCCESS, payload: user_detail.data })
  } catch (error) {
    console.log(error)
  }
}

function* onUpdateUserDetail(action) {
  try {
    const update_user_detail = yield call( UserApiUpdateUserDetail, action.profile )
    console.log('update_user_detail', update_user_detail)
    yield put({ type: userConstants.UPDATE_USER_DETAIL_SUCCESS, payload: update_user_detail})
    // yield put({ type: userConstants.LOAD_USER_DETAIL_SUCCESS, payload: update_user_detail })
  } catch (error) {
    console.log(error)
  }
}

export default function* Login () {
  yield takeLatest( userConstants.USER_LOGIN_REQUEST, onLogin )
  yield takeLatest( userConstants.LOAD_USER_DETAIL_REQUEST, onLoadUserDetails )
  yield takeLatest( userConstants.UPDATE_USER_DETAIL_REQUEST, onUpdateUserDetail)
}