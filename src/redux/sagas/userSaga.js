import { put, takeLatest, call } from 'redux-saga/effects';
import * as userConstants from '../constants/userConstants';
import { 
  UserApiLogin, 
  UserApiLoadUserDetail, 
  UserApiUpdateUserDetail,
  UserApiLoadMentorsName,
} from '../../api/userApi';

function* onLogin(action) {
  try {
    const user = yield call(UserApiLogin, action.user)
    if (user.status === 'error'){
      yield put({ type: userConstants.USER_LOGIN_FAILURE, messages: user.message })
    } else {
      yield put({ type: userConstants.USER_LOGIN_SUCCESS, payload: user })
      yield put({ type: userConstants.USER_LOGIN_FAILURE, messages: '' })
      user.user.role === 'intern' ? 
        action.props.history.push("/intern-home/discuss") : 
        action.props.history.push("/mentor-home/discuss");
    }
  } catch (error) {
    yield put({ type: userConstants.USER_LOGIN_FAILURE, error })
  }
}

function* onLoadUserDetails() {
  try {
    const user_detail = yield call(UserApiLoadUserDetail)
    yield put({ type: userConstants.LOAD_USER_DETAIL_SUCCESS, payload: user_detail.data })
  } catch (error) {
    console.log(error)
  }
}

function* onUpdateUserDetail(action) {
  try {
    const update_user_detail = yield call( UserApiUpdateUserDetail, action.profile )
    const user_detail = yield call(UserApiLoadUserDetail)
    console.log('update_user_detail', update_user_detail)
    yield put({ type: userConstants.UPDATE_USER_DETAIL_SUCCESS, payload: user_detail.data })
  } catch (error) {
    console.log(error)
  }
}

function* onLoadMentorsName(action) {
  try {
    const team = action.team;
    const mentors_name = yield call(UserApiLoadMentorsName, team);
    yield put({ type: userConstants.LOAD_MENTORS_NAME_SUCCESS, payload: mentors_name })
  } catch(error) {
    console.log(error)
  }
}

export default function* Login () {
  yield takeLatest( userConstants.USER_LOGIN_REQUEST, onLogin )
  yield takeLatest( userConstants.LOAD_USER_DETAIL_REQUEST, onLoadUserDetails )
  yield takeLatest( userConstants.UPDATE_USER_DETAIL_REQUEST, onUpdateUserDetail)
  yield takeLatest( userConstants.LOAD_MENTORS_NAME_REQUEST, onLoadMentorsName)
}