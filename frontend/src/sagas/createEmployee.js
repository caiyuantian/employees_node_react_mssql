import { put, takeEvery, call } from 'redux-saga/effects'
import actionTypes from '../actionTypes'
import config from '../config'


export function* createEmployeeAsync(action) {
    let data = {
        EmployeeNumber: action.EmployeeNumber!==''?action.EmployeeNumber:null,
        FirstName: action.FirstName,
        LastName: action.LastName,
        Extension: action.Extension!==''?action.Extension:null,
        RoleID: action.RoleID!==''?action.RoleID:null
    }
    console.log(JSON.stringify(data));
    try {
        //console.log('http://localhost:5000/api/v1/employee/'+EmployeeID);
        const response = yield call(fetch, config.backendAddress+'/api/v1/employees', 
        {body: JSON.stringify(data), method: 'POST', headers: new Headers({
            'Content-Type': 'application/json'
          })});
        const employee = yield call([response, 'json']);
        if (!!employee) {
            //yield put({ type: actionTypes.FEATCH_EMPLOYEE_FOR_DISPLAY_OK, employeeForDisplay: employee});
        }
        //return data[0].usernameName;
    } catch (e) {
        console.log(e);
        //return null;
    }
}

export function* createEmployeeFetchRolesAsync() {
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


export function* watchCreateEmployee() {
    yield takeEvery(actionTypes.CREATE_EMPLOYEE_FETCH_ROLES_ASYNC, createEmployeeFetchRolesAsync);
    yield takeEvery(actionTypes.CREATE_EMPLOYEE_ASYNC, createEmployeeAsync);
    
}