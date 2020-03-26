import { put, call, takeLatest } from 'redux-saga/effects';
import { CreateAssignment } from '../../api/assignmentsApi';
import * as assignmentsConstants from '../constants/assignmentsConstants'

function* onCreateAssignment(action) {
  try {
    yield call(CreateAssignment, action.profile)
  } catch (error) {
    console.log(error)
  }
}

export default function* Assignment() {
  yield takeLatest(assignmentsConstants.CREATE_ASSIGNMENT_REQUEST, onCreateAssignment)
}