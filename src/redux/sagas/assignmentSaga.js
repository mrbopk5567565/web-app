import { put, call, takeLatest } from 'redux-saga/effects';
import { CreateAssignment, LoadAssignment } from '../../api/assignmentsApi';
import * as assignmentsConstants from '../constants/assignmentsConstants'

function* onCreateAssignment(action) {
  try {
    yield call(CreateAssignment, action.profile)
  } catch (error) {
    console.log(error)
  }
}

function* onLoadAssignments(action) {
  try {
    const assignments = yield call(LoadAssignment, action.page);
    yield put({ type: assignmentsConstants.LOAD_ASSIGNMENTS_SUCCESS, payload: assignments });
  } catch (error) {
    console.log(error)
  }
}

export default function* Assignment() {
  yield takeLatest(assignmentsConstants.CREATE_ASSIGNMENT_REQUEST, onCreateAssignment)
  yield takeLatest(assignmentsConstants.LOAD_ASSIGNMENTS_REQUEST, onLoadAssignments)
}