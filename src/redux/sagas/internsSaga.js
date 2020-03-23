import { put, takeLatest, call } from 'redux-saga/effects';
import * as internConstants from '../constants/internConstants';
import { loadMentorDetail } from '../../api/internsApi'

function* onLoadMentorDetail() {
  try {
    const mentor_detail = yield call(loadMentorDetail)
    yield put({ type: internConstants.LOAD_MENTOR_DETAIL_SUCCESS, payload: mentor_detail })
  } catch (error) {
    console.log(error)
  }
}

export default function* Interns (){
  yield takeLatest( internConstants.LOAD_MENTOR_DETAIL_REQUEST, onLoadMentorDetail )
}