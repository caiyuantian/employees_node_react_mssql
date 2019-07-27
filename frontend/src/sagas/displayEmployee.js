import { put, takeEvery, call } from 'redux-saga/effects'
import actionTypes from '../actionTypes'
import config from '../config'


export function* fetchEmployeeForDisplayAsync(action) {
    let EmployeeID = action.EmployeeID;
    try {
        //console.log('http://localhost:5000/api/v1/employee/'+EmployeeID);
        const response = yield call(fetch, config.backendAddress+'/api/v1/employee/'+EmployeeID);
        const employee = yield call([response, 'json']);
        if (!!employee) {
            yield put({ type: actionTypes.FEATCH_EMPLOYEE_FOR_DISPLAY_OK, employeeForDisplay: employee});
        }
        //return data[0].usernameName;
    } catch (e) {
        console.log(e);
        //return null;
    }
}


export function* watchDisplayEmployee() {
    yield takeEvery(actionTypes.FETCH_EMPLOYEE_FOR_DISPLAY_ASYNC, fetchEmployeeForDisplayAsync);
    
}