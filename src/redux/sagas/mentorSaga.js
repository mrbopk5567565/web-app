import { put, call, takeLatest } from 'redux-saga/effects';
import * as mentorConstants from '../constants/mentorConstants';
import { LoadInterns, LoadInternsMentor } from '../../api/mentorsApi';

function* onLoadListIntern(action) {
  try {
    const data_interns = yield call(LoadInterns, action.page);
    // yield put({ type: mentorConstants.LOAD_INTERNS_SUCCESS, data_interns })
    const id = action.id;
    const id_detail = data_interns.data.filter(item => item.id == id)[0]
    yield put({ type: mentorConstants.LOAD_INTERNS_SUCCESS, payload: id_detail, data_interns })
  } catch (error) {
    console.log(error)
  }
}

function* onLoadInternsMentor(action) {
  try {
    const interns_of_mentor = yield call(LoadInternsMentor, action.id_mentor)
    yield put({ type: mentorConstants.LOAD_INTERNS_MENTOR_SUCCESS, payload: interns_of_mentor })
  } catch (error) {
    console.log(error)
  }
}

export default function* Mentor() {
  yield takeLatest(mentorConstants.LOAD_INTERNS_REQUEST, onLoadListIntern)
  yield takeLatest(mentorConstants.LOAD_INTERNS_MENTOR_REQUEST, onLoadInternsMentor)
}