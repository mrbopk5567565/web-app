import { put, call, takeLatest } from 'redux-saga/effects';
import {
  CreateAssignment,
  LoadAssignment,
  EditAssignment,
  LoadIdAssignment,
  DeleteAssignment
} from '../../api/assignmentsApi';
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

function* onEditAssignment(action) {
  try {
    const status = yield call(EditAssignment, action.id_assignment, action.profile)
    const data_id_assignment = yield call(LoadIdAssignment, action.id_assignment)
    yield put({ type: assignmentsConstants.EDIT_ASSIGNMENTS_SUCCESS, payload: status, data_id_assignment })
  } catch (error) {
    console.log(error)
  }
}

function* onDeleteAssignment(action) {
  try {
    const data_id_assignment = yield call(LoadIdAssignment, action.id_assignment_detele)
    const status = yield call(DeleteAssignment, action.id_assignment_detele);
    yield put({ type: assignmentsConstants.DELETE_ASSIGNMENT_SUCCESS, payload: status, data_id_assignment })
  } catch (error) {
    console.log(error)
  }
}

export default function* Assignment() {
  yield takeLatest(assignmentsConstants.CREATE_ASSIGNMENT_REQUEST, onCreateAssignment)
  yield takeLatest(assignmentsConstants.LOAD_ASSIGNMENTS_REQUEST, onLoadAssignments)
  yield takeLatest(assignmentsConstants.EDIT_ASSIGNMENTS_REQUEST, onEditAssignment)
  yield takeLatest(assignmentsConstants.DELETE_ASSIGNMENT_REQUEST, onDeleteAssignment)
}