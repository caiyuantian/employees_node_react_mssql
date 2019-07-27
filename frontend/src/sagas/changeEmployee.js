import { put, takeEvery, call } from 'redux-saga/effects'
import actionTypes from '../actionTypes'
import config from '../config'


export function* fetchEmployeeTobeUpdateAsync(action) {
    let EmployeeID = action.EmployeeID;
    try {
        //console.log('http://localhost:5000/api/v1/employee/'+EmployeeID);
        const response = yield call(fetch, config.backendAddress+'/api/v1/employee/'+EmployeeID);
        const employee = yield call([response, 'json']);
        if (!!employee) {
            yield put({ type: actionTypes.FEATCH_EMPLOYEE_TOBE_CHANGE_OK, employeeTobeChange: employee});
        }
        //return data[0].usernameName;
    } catch (e) {
        console.log(e);
        //return null;
    }
}

export function* fetchRoleAsync() {
    try {
        const response = yield call(fetch, config.backendAddress+'/api/v1/roles');
        const roles = yield call([response, 'json']);
        if (!!roles) {
            yield put({ type: actionTypes.FEATCH_ROLES_OK, roles: roles});
        }
    } catch (e) {
        console.log(e);
    }
}


export function* updateEmployeeAsync(action) {
    let data = {
        EmployeeID: action.EmployeeID,
        EmployeeNumber: action.EmployeeNumber,
        FirstName: action.FirstName,
        LastName: action.LastName,
        Extension: action.Extension,
        RoleID: action.RoleID
    }
    console.log(JSON.stringify(data));
    try {
        const response = yield call(fetch, config.backendAddress+'/api/v1/employee/'+action.EmployeeID,
         {body: JSON.stringify(data), method: 'PUT', headers: new Headers({
            'Content-Type': 'application/json'
          })}, );
        const updateResult = yield call([response, 'json']);
        console.log(JSON.stringify(updateResult));

    } catch (e) {
        console.log(e);
    }
}


export function* watchClickChangeEmployee() {
    yield takeEvery(actionTypes.FETCH_EMPLOYEE_TOBE_UPDATE_ASYNC, fetchRoleAsync);
    yield takeEvery(actionTypes.FETCH_EMPLOYEE_TOBE_UPDATE_ASYNC, fetchEmployeeTobeUpdateAsync);
    yield takeEvery(actionTypes.UPDATE_EMPLOYEE_ASYNC, updateEmployeeAsync);
    
}