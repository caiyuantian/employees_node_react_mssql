import { put, takeEvery, call } from 'redux-saga/effects'
import actionTypes from '../actionTypes'
import config from '../config'

export function* deleteEmployeeAsync(action) {

    console.log("deleting: "+action.EmployeeID)
    let EmployeeID = action.EmployeeID;
    let queryStr = "?pageSize="+action.pageSize+"&pageNo="+action.pageNo
    try {
        const response = yield call(fetch, config.backendAddress+'/api/v1/employee/'+EmployeeID, 
        {method: 'DELETE'});
        //const employee = yield call([response, 'json']);

        yield put({ type: actionTypes.FETCH_EMPLOYEES_ASYNC, query: queryStr});

        //return data[0].usernameName;
    } catch (e) {
        console.log(e);
        //return null;
    }
}


export function* watchdeleteEmployee() {
    yield takeEvery(actionTypes.ON_CLICK_DELETE_EMPLOYEE_ASYNC, deleteEmployeeAsync);
    
}