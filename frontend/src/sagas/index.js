import { fork } from 'redux-saga/effects'
import { watchFetchEmployee } from './fetchEmployee'
import { watchEmployeePage } from './employees'
import { watchClickChangeEmployee } from './changeEmployee'
import { watchDisplayEmployee } from './displayEmployee'
import { watchCreateEmployee } from './createEmployee'
import { watchdeleteEmployee } from './deleteEmployee'

export default function* rootSaga() {
    yield fork(watchFetchEmployee);
    yield fork(watchClickChangeEmployee);
    yield fork(watchEmployeePage);
    yield fork(watchDisplayEmployee);
    yield fork(watchCreateEmployee);
    yield fork(watchdeleteEmployee);
}